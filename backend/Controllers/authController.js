const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/userModel");
const { sendSuccess, sendError } = require("../utils/responseHandler");


const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) {
      return sendError(res, "All fields are required", 400);
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return sendError(res, "User already exists, you can login", 409);
  
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    return sendSuccess(res, "Register successfully", newUser);

  } catch (err) {
    console.error("Error during signup:", err);
    return sendError(res, "Internal server error", 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return sendError(res, "All fields are required", 400);
    }

    // Check if the user exists in the database
    const existingUser = await UserModel.findOne({ email });
    const errorMsg = "Auth failed: email or password is incorrect";

    if (!existingUser) {
      return sendError(res, errorMsg, 403);
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return sendError(res, errorMsg, 403);
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Respond with a success message and the token
    return sendSuccess(res, "Login successfully", {jwtToken,
      email: existingUser.email});
  } catch (err) {
    console.error("Error during login:", err);
    return sendError(res, "Internal server error", 500);
  }
};


module.exports = { 
    signup, 
    login
};
