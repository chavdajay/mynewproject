import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Register = () => {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({ email: '', password: '', confirmPassword: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = signupInfo;

        // Validation email, password, and confirmpassword required
        if (!email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email validation
        if (!emailRegex.test(email)) {
            return handleError('Please enter a valid email address');
        }
        if (password.length < 6) {
            return handleError('Password must be at least 6 characters long');
        }
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const url = `${process.env.REACT_APP_API_URL}register`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password })
            });

            const results = await response.json();
            const { status, message, error } = results;

            if (status === "success") {
                handleSuccess(message);
                navigate('/login')
                
            } else {
                handleError(error?.details[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Sign Up</h1>
            <form className="w-50 mx-auto" onSubmit={handleSignup}>
               
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={signupInfo.email}
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
                        value={signupInfo.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={signupInfo.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
