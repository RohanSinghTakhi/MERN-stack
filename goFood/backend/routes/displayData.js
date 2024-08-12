const express = require('express');
const Router = express.Router();
require('../db');

// Route to fetch food data
Router.post('/fooddata', (req, res) => {
    try {
        if (!global.data || !global.foodCategories) {
            return res.status(404).json({ message: "No data available" });
        }
        
        console.log(global.data);
        res.send({
            data: global.data,
            foodCategories: global.foodCategories
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = Router;
