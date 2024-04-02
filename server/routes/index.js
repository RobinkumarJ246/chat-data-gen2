// routes/index.js

const { Router } = require("express");
const { MongoClient } = require('mongodb');

const router = Router();
const uri = "mongodb+srv://admin4321:iceberginflorida@cluster0.7nzmtv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
      await client.connect();
      console.log('Connected to MongoDB');
      return client.db('chatdatagen');
  } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
  }
}

// handle get reuest on route /api/name
router.get("/name", (_, res) => {
  return res.status(200).json({ name: "Farasat Ali" });
});

// handle get reuest on route /api/greet
router.get("/greet", (_, res) => {
  return res.status(200).json({ greet: "Hello there!!" });
});

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