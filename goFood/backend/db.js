const mongoose = require('mongoose');

const uri = "mongodb+srv://GOfood:Manjit%40970@cluster0.folbobx.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
        });
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

module.exports = connectToDatabase;
