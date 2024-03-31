// src/server/index.js

const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db'); // Import the database connection function

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Import your API route files
const loginRoutes = require('./routes/login_api'); // Assuming login_api.js is in the routes folder
// Add other route files as needed (e.g., emailRoutes)

// Connect to MongoDB
connectToDatabase()
    .then((database) => {
        // Use your API routes
        app.use('/api/auth', loginRoutes); // Mount login routes under /api/auth
        // Add other API routes here

        // Other API routes...
        // ...

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error starting server:', err);
    });