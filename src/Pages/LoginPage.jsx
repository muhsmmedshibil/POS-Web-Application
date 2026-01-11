import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Dummy Credentials
    const DUMMY_EMAIL = "muhammedshibil@gmail.com";
    const DUMMY_PASSWORD = "shibil@123";

    // Clear errors when toggling modes
    useEffect(() => {
        setErrors({});
    }, [isForgotMode]);

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!email) {
            tempErrors.email = "Staff email is required";
        } else if (!emailRegex.test(email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        if (!isForgotMode && !password) {
            tempErrors.password = "Access pin is required";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            
            // Simulating a network delay for a more realistic/premium feel
            setTimeout(() => {
                if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/Home');
                } else {
                    setErrors({
                        email: email !== DUMMY_EMAIL ? "Email not recognized" : "",
                        password: password !== DUMMY_PASSWORD ? "Invalid access pin" : ""
                    });
                    setIsLoading(false);
                }
            }, 800);
        }
    };

    return (
        <div className="login-page-wrapper">
            {/* Animated Background Blob */}
            <div className="abstract-decoration"></div>

            <div className="main-container">
                {/* Left Side: Branding */}
                <div className="content-left">
                    <div className="logo-area">
                        <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="30" width="60" height="40" rx="3" stroke="white" strokeWidth="4" />
                            <rect x="30" y="70" width="40" height="5" fill="white" />
                            <path d="M40 45H60M40 55H50" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <div className="logo-text">
                            <h1>SwiftPOS™</h1>
                            <span>Next-Gen Checkout Solutions</span>
                        </div>
                    </div>
                    <p className="hero-message">
                        Access your <b>Store Terminal</b> to manage transactions, track inventory, and generate reports.
                    </p>
                </div>

                {/* Right Side: Login Card */}
                <div className="content-right">
                    <div className="login-card">
                        {!isForgotMode ? (
                            <div className="fade-in">
                                <h2>Terminal Sign-In</h2>
                                <p className="subtitle">Enter credentials to open your shift.</p>
                                
                                <form onSubmit={handleLogin} noValidate>
                                    <div className="input-box">
                                        <label>Staff Email</label>
                                        <input
                                            type="email"
                                            className={`input-field ${errors.email ? 'error-border' : ''}`}
                                            placeholder="name@store.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>

                                    <div className="input-box">
                                        <label>Access Pin</label>
                                        <input
                                            type="password"
                                            className={`input-field ${errors.password ? 'error-border' : ''}`}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors.password && <span className="error-text">{errors.password}</span>}
                                    </div>

                                    <div className="row-options">
                                        <label className="checkbox-label">
                                            <input type="checkbox" /> 
                                            <span>Stay clocked in</span>
                                        </label>
                                        <button
                                            type="button"
                                            className="text-btn"
                                            onClick={() => setIsForgotMode(true)}
                                        >
                                            Forgot PIN?
                                        </button>
                                    </div>

                                    <button type="submit" className="btn-login" disabled={isLoading}>
                                        {isLoading ? "Verifying..." : "Open Terminal"}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="fade-in">
                                <h2>Reset Access</h2>
                                <p className="subtitle">Enter recovery email for your POS pin.</p>
                                <form onSubmit={(e) => { e.preventDefault(); if(validate()) alert('Sent!'); }} noValidate>
                                    <div className="input-box">
                                        <label>Recovery Email</label>
                                        <input
                                            type="email"
                                            className={`input-field ${errors.email ? 'error-border' : ''}`}
                                            placeholder="email@store.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <button type="submit" className="btn-login">Request New PIN</button>
                                    <button
                                        type="button"
                                        className="btn-back"
                                        onClick={() => setIsForgotMode(false)}
                                    >
                                        Back to Terminal
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;