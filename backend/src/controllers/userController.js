const { getDB } = require('../config/db');

const insertUser = async (req, res) => {
    try {
        const db = await getDB();
        const collection = db.collection("users");
        
        const result = await collection.insertOne(req.body);
        console.log("Successfully inserted document:", result);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error inserting to MongoDB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    insertUser
}; 