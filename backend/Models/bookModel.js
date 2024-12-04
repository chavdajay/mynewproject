const mongoose = require('mongoose');

// Create a new schema using Mongoose
const Schema = mongoose.Schema;

// Define the Book schema
const BookSchema = new Schema({
    title: {
        type: String, 
        required: true, 
    },
    author: {
        type: String, 
        required: true, 
    },
});

// Create the model for the 'books' collection
const BookModel = mongoose.model('books', BookSchema);
module.exports = BookModel;
