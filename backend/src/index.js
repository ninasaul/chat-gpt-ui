const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/users', userRoutes);

// Insert endpoint
app.post('/api/insert', async (req, res) => {
    try {
        console.log("insert endpoint hit");
        console.log("Inserting message:", req.body);
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("messages");
        const result = await collection.insertOne(req.body);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error inserting to MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Database connection and server start
async function startServer() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

startServer(); 