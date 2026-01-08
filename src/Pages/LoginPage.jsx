import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isForgotMode, setIsForgotMode] = useState(false);

    // Dummy Credentials
    const DUMMY_EMAIL = "muhammedshibil@gmail.com";
    const DUMMY_PASSWORD = "sinsha@123";

    // Validation Logic
    const validate = () => {
        let tempErrors = {};
        
        // Basic format validation
        if (!email) {
            tempErrors.email = "Staff email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        if (!isForgotMode) {
            if (!password) {
                tempErrors.password = "Access pin is required";
            }
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // 1. Run basic validation (empty fields, email format)
        if (validate()) {
            // 2. Check if credentials match dummy data
            if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
                localStorage.setItem('isLoggedIn', 'true');
                console.log("Terminal Access Granted");
                navigate('/Home');
            } else {
                // 3. Set specific errors for incorrect login
                let loginErrors = {};
                if (email !== DUMMY_EMAIL) {
                    loginErrors.email = "Email not found in system";
                }
                if (password !== DUMMY_PASSWORD) {
                    loginErrors.password = "Incorrect access pin";
                }
                setErrors(loginErrors);
            }
        }
    };

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert(`Recovery instructions sent to ${email}`);
            setIsForgotMode(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="abstract-decoration"></div>

            <div className="main-container">
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
                    <div className="hero-message">
                        Access your <b>Store Terminal</b> to manage transactions, track inventory, and generate reports.
                    </div>
                </div>

                <div className="content-right">
                    <div className="login-card">
                        {!isForgotMode ? (
                            <>
                                <h2>Terminal Sign-In</h2>
                                <p className="subtitle">Enter credentials to open your shift.</p>
                                
                                <form onSubmit={handleLogin} noValidate>
                                    <div className="input-box">
                                        <label>Staff Email</label>
                                        <input
                                            type="email"
                                            className={`input-field ${errors.email ? 'error-border' : ''}`}
                                            placeholder="muhammedshibil@gmail.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if(errors.email) setErrors({...errors, email: ""});
                                            }}
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
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                if(errors.password) setErrors({...errors, password: ""});
                                            }}
                                        />
                                        {errors.password && <span className="error-text">{errors.password}</span>}
                                    </div>

                                    <div className="row-options">
                                        <label><input type="checkbox" /> Stay clocked in</label>
                                        <button
                                            type="button"
                                            className="text-btn"
                                            onClick={() => { setIsForgotMode(true); setErrors({}); }}
                                        >
                                            Forgot PIN?
                                        </button>
                                    </div>

                                    <button type="submit" className="btn-login">Open Terminal</button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>Reset Access</h2>
                                <p className="subtitle">Enter recovery email for your POS pin.</p>
                                <form onSubmit={handleForgotSubmit} noValidate>
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
                                        onClick={() => { setIsForgotMode(false); setErrors({}); }}
                                    >
                                        Back to Terminal
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;