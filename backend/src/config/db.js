const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://danora:danora@34.68.23.90:27017/danora?authSource=admin";
const dbName = process.env.DB_NAME || "danora";

let client;

async function connectDB() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
    }
    return client;
}

async function getDB() {
    const client = await connectDB();
    return client.db(dbName);
}

module.exports = {
    connectDB,
    getDB
}; 