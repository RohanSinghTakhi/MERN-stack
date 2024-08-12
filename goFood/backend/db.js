const mongoose = require('mongoose');
const uri = "mongodb+srv://GOfood:Manjit%40970@cluster0.folbobx.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";


const DataSchema = new mongoose.Schema({}, { collection: 'data' });
const Data = mongoose.model('Data', DataSchema);

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 
        });
        console.log("Connected to MongoDB successfully");

        
        const fetchedData = await Data.find({}).exec(); 

        
        const foodCategoryCursor = mongoose.connection.db.collection("foodCategory");
        const foodCategories = await foodCategoryCursor.find({}).toArray(); 0

        
        
        console.log("Fetched Food Categories:", foodCategories);

        
        global.data = fetchedData;
        global.foodCategories = foodCategories;
        
        console.log("Data and food categories fetched and assigned to global variables");

    } catch (err) {
        console.error("Failed to connect to MongoDB or fetch data:", err.message);
    }
}


connectToDatabase();


module.exports = connectToDatabase;

