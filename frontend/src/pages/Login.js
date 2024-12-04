// Importing necessary modules and components
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Toast notifications for feedback
import { handleError, handleSuccess } from '../utils'; // Utility functions for handling success and error messages

// Login component
const Login = () => {
    // State to manage form input data for login
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

    // Hook for navigation after successful login
    const navigate = useNavigate();

    /**
     * Handles changes in the input fields.
     * Updates the `loginInfo` state dynamically.
     * @param {Object} e - Event object from the input field.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    /**
     * Handles the form submission for login.
     * Validates input, sends login request to the server, and processes the response.
     * @param {Object} e - Event object for form submission.
     */
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Destructuring email and password from the state
        const { email, password } = loginInfo;

        // Basic validation: Check if email and password are provided
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            // API URL for the login endpoint
            const url = `${process.env.REACT_APP_API_URL}login`;

            // Sending POST request with login data
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            // Parsing the response JSON
            const results = await response.json();
            console.log(results); // Debugging: Log the server response

            // Destructuring the response
            const { status, message } = results;
            const { jwtToken } = results.data;

            // Handle successful login
            if (status === "success") {
                console.log("jwttoken", jwtToken); // Debugging: Log the JWT token
                handleSuccess(message); // Show success message
                localStorage.setItem('token', jwtToken); // Save JWT token in local storage
                setTimeout(() => navigate('/book-list'), 1000); // Redirect to the book list after a delay
            } else {
                handleError(message); // Show error message if login fails
            }
        } catch (err) {
            // Catch and handle any unexpected errors
            handleError(err);
        }
    };

    return (
        <div className="container mt-5">
            {/* Page Title */}
            <h1 className="text-center mb-4">Login</h1>

            {/* Login Form */}
            <form className="w-50 mx-auto" onSubmit={handleLogin}>
                <div className="mb-3">
                    {/* Email Input */}
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={loginInfo.email} // Controlled input
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-3">
                    {/* Password Input */}
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={loginInfo.password} // Controlled input
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">Login</button>

                {/* Redirect to Sign Up */}
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </form>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
