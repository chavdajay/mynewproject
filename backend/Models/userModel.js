const mongoose = require('mongoose');

// Create a new schema using Mongoose
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});
// Create the model for the 'user' collection
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
