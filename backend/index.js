const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // For parsing incoming JSON request bodies
const cors = require('cors'); // Enables Cross-Origin Resource Sharing
const AuthRouter = require('./Routes/authRoutes.js'); // Routes for authentication
const BookRouter = require('./Routes/bookRoutes.js'); // Routes for book-related operations

// Load environment variables from the .env file
require('dotenv').config();

// Establish a connection to the MongoDB database
require('./config/db.config.js'); // Ensures MongoDB is connected before proceeding

// Set the server's port, defaulting to 8080 if not specified in the .env file
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json()); // Parses incoming JSON requests and makes them available in req.body
app.use(cors()); // Enables secure resource sharing between client and server

app.use('/', AuthRouter);
app.use('/books', BookRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); 
});
