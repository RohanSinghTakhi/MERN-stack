/* eslint-disable no-undef */
const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://GOfood:Manjit%40970@cluster0.folbobx.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const fetchdata = db.collection("data");
        const data = await fetchdata.find().toArray();
        //console.log("Fetched data:", data);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);}
}

connectToDatabase();

module.exports = connectToDatabase; 