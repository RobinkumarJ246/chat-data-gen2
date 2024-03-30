const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Login route
router.post('/login', async (req, res) => {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
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
    console.error(err);
    res.status(500).json({ error: 'An error occurred during login' });
  } finally {
    await client.close();
  }
});

// Other authentication routes...

module.exports = router;