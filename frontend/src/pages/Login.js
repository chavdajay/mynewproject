import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import { handleError, handleSuccess } from '../utils';


const Login = () => {

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

   //set data loginInfo state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

  
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Destructuring email and password from the state
        const { email, password } = loginInfo;

        // validation for email and password are required
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
           
            const url = `${process.env.REACT_APP_API_URL}login`;

            // Sending POST request with login data
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
           
            const results = await response.json();

            // Destructuring the response
            const { status, message } = results;
            const { jwtToken } = results.data;

            // Handle successful login
            if (status === "success") {
                handleSuccess(message); // Show success message
                localStorage.setItem('token', jwtToken); // Save JWT token in local storage
                navigate('/book-list')// Redirect to the book list 
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
            <h1 className="text-center mb-4">Login</h1>
            <form className="w-50 mx-auto" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={loginInfo.email} 
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={loginInfo.password} 
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>

                {/* Redirect to Register */}
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
