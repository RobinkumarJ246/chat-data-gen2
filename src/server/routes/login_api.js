// src/server/routes/login_api.js

const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db'); // Import the database connection function

// Login route
router.post('/login', async (req, res) => {
    try {
        const database = await connectToDatabase(); // Connect to the database
        const auth = database.collection('auth');

        // Find the user in the 'auth' collection
        const user = await auth.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== req.body.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

module.exports = router;