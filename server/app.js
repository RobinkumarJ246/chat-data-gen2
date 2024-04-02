// app.js
//just to push
// to create our express app
const express = require("express");
// package to handle file paths
const path = require("path");
// our custom routes
const appRoutes = require("./routes");

// initialize the express app
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

// set the port (you could use any but usually it is 5000)
const port = process.env.PORT || 4000;

// next two lines tells parse requests of content-type
// which are application/x-www-form-urlencoded and json respectively
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to make build folder static
app.use(express.static(path.resolve('out')));

// appRoutes are the routes your backend will use
// by convention we use /api before any backend routes
app.use("/api", appRoutes);

// ...

// If user hits the / route we will be
// shown our react frontend app as we are
// returning the content of build folder
app.use((_, res) => {
  res.sendFile(path.resolve('out', 'index.html'));
});

// If user hits the route that donot exist
// we will shoe not found message
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Not found!",
  });
});

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

// Connect to MongoDB
connectToDatabase()

// Launch app to listen to specified port
app.listen(port, () => {
  console.log(`Your server is running on Port: ${port}`);
});