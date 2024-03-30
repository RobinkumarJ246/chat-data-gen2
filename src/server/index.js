const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const authRoutes = require('./controllers/authController');
const emailRoutes = require('./controllers/emailController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Use your auth routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Other API routes...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});