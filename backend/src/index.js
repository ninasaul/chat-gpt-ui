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

// Create new user endpoint
app.post('/api/users/create', async (req, res) => {
    try {
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("collection1");
        
        const userData = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await collection.insertOne(userData);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error creating user in MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create user profile endpoint
app.post('/api/profiles/create', async (req, res) => {
    try {
        console.log('Received profile update request with data:', req.body);
        
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("Profiles");
        
        const profileData = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Check if profile already exists for this user
        const existingProfile = await collection.findOne({ uid: profileData.uid });
        console.log('Existing profile found:', existingProfile ? 'Yes' : 'No');
        
        let result;
        if (existingProfile) {
            // Update existing profile
            result = await collection.updateOne(
                { uid: profileData.uid },
                { $set: { ...profileData, updatedAt: new Date() } }
            );
            console.log('Profile update result:', result);
        } else {
            // Create new profile
            result = await collection.insertOne(profileData);
            console.log('Profile creation result:', result);
        }
        
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error creating/updating profile in MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Check if user has a profile
app.get('/api/profiles/check/:uid', async (req, res) => {
    try {
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("Profiles");
        
        const profile = await collection.findOne({ uid: req.params.uid });
        res.json({ exists: !!profile });
    } catch (error) {
        console.error("Error checking profile in MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user profile
app.get('/api/profiles/:uid', async (req, res) => {
    try {
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("Profiles");
        
        const profile = await collection.findOne({ uid: req.params.uid });
        if (profile) {
            res.json({ success: true, profile });
        } else {
            res.status(404).json({ success: false, error: 'Profile not found' });
        }
    } catch (error) {
        console.error("Error fetching profile from MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

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

// Store chat messages endpoint
app.post('/api/chats/store', async (req, res) => {
    try {
        const { getDB } = require('./config/db');
        const db = await getDB();
        const collection = db.collection("chats");
        
        const messageData = {
            ...req.body,
            timestamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Try to find an existing document for this user and persona
        const existingChat = await collection.findOne({ 
            uid: messageData.uid,
            persona: messageData.persona // Add persona to the query
        });
        
        if (existingChat) {
            // If document exists, push the new message to the messages array
            const result = await collection.updateOne(
                { 
                    uid: messageData.uid,
                    persona: messageData.persona // Add persona to the query
                },
                { 
                    $push: { messages: messageData },
                    $set: { updatedAt: new Date() }
                }
            );
            res.json({ success: true, result });
        } else {
            // If no document exists, create a new one with the first message
            const result = await collection.insertOne({
                uid: messageData.uid,
                userEmail: messageData.userEmail,
                persona: messageData.persona, // Store persona information
                messages: [messageData],
                createdAt: new Date(),
                updatedAt: new Date()
            });
            res.json({ success: true, result });
        }
    } catch (error) {
        console.error("Error storing chat in MongoDB:", error);
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