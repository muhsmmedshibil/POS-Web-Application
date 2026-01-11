import React, { useState } from 'react';
import {
    Mail, MapPin, Hash, Lock, LogOut, Smartphone,
    ShieldCheck, Globe, Calendar, Phone,
    User, ShoppingBag, CreditCard, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this
import './UserProfile.css';

const UserProfile = ({
    // 10 Relatable Shop Datas
    shopName = "iTECH MOBILE SOLUTIONS",
    email = "muhammedshibil@gmail.com",
    shopId = "REQ-PHN-2026-X1",
    password = "shibil@123",
    location = "Mall of Emirates, Ground Floor, Dubai",
    shopType = "Authorized Reseller & Service Center",
    contactNumber = "+971 50 123 4567",
    managerName = "John Doe",
    gstNumber = "22AAAAA0000A1Z5",
    operatingHours = "10:00 AM - 11:00 PM",
    imageUrl = "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000",
}) => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Clear login state
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            <div className="main-card-container">

                {/* Header Section */}
                <div className="header-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageUrl})` }}>
                    <div className="header-left">
                        <div className="icon-box-main">
                            <Smartphone size={35} />
                        </div>
                        <div className="title-stack">
                            <h1>{shopName}</h1>
                            <span className="live-status">● System Online</span>
                        </div>
                    </div>
                    <button className="logout-action-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="dashboard-content">
                    <div className="grid-layout">

                        {/* 1. Shop ID */}
                        <div className="data-item">
                            <label><Hash size={14} /> Shop Identifier</label>
                            <p>{shopId}</p>
                        </div>

                        {/* 2. Shop Type */}
                        <div className="data-item">
                            <label><ShoppingBag size={14} /> Shop Category</label>
                            <p>{shopType}</p>
                        </div>

                        {/* 3. Manager Name */}
                        <div className="data-item">
                            <label><User size={14} /> Store Manager</label>
                            <p>{managerName}</p>
                        </div>

                        {/* 4. Contact Phone */}
                        <div className="data-item">
                            <label><Phone size={14} /> Contact Number</label>
                            <p>{contactNumber}</p>
                        </div>

                        {/* 5. Email */}
                        <div className="data-item">
                            <label><Mail size={14} /> Official Email</label>
                            <p>{email}</p>
                        </div>

                        {/* 6. Operating Hours */}
                        <div className="data-item">
                            <label><Clock size={14} /> Store Timing</label>
                            <p>{operatingHours}</p>
                        </div>

                        {/* 7. GST/Tax ID */}
                        <div className="data-item">
                            <label><CreditCard size={14} /> GST / Tax Number</label>
                            <p>{gstNumber}</p>
                        </div>

                        {/* 8. Location */}
                        <div className="data-item">
                            <label><MapPin size={14} /> Shop Address</label>
                            <p>{location}</p>
                        </div>

                        {/* 9. Password (With Toggle) */}
                        <div className="data-item full-width highlight-item">
                            <label><Lock size={14} /> Access Password</label>
                            <div className="row-flex">
                                <p>{showPass ? password : "••••••••••••••••"}</p>
                                <button className="toggle-view" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* 10. Verification Status */}
                        <div className="data-item full-width">
                            <label><ShieldCheck size={14} /> Certification</label>
                            <p className="verified-text">✓ Verified Premium Device Vendor (Exp: 2028)</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;