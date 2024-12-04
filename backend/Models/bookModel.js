// Importing Mongoose for database interaction
const mongoose = require('mongoose');

// Create a new schema using Mongoose
const Schema = mongoose.Schema;

// Define the Book schema
const BookSchema = new Schema({
    title: {
        type: String, // Data type is a string
        required: true, // This field is mandatory
    },
    author: {
        type: String, // Data type is a string
        required: true, // This field is mandatory
    },
});

// Create the model for the 'books' collection
const BookModel = mongoose.model('books', BookSchema);

// Export the BookModel to use it in other parts of the application
module.exports = BookModel;
