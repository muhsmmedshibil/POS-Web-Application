import React from 'react';
import './UserProfile.css';

const UserProfile = ({
    name = "SARAH JENKINS",
    role = "PROJECT MANAGER",
    bio = "Senior manager with 10+ years of experience in agile development and team leadership.",
    stats = { articles: 350, followers: "25k", rating: 8.9 },
    imageUrl = "https://static.vecteezy.com/system/resources/thumbnails/007/486/093/small/portrait-of-happy-redhaired-woman-employee-in-optical-glasses-has-satisfied-expression-works-with-modern-gadgets-waits-for-meeting-with-colleague-prepares-accounting-report-sits-in-own-cabinet-free-photo.jpg"
}) => {
    return (
        <div className='main-profile-card'>
            <div className="profile-card">
                <div className="image-container">
                    <img src={imageUrl} alt={name} />
                </div>

                <div className="header-info">
                    <h1>{name}</h1>
                    <h3>{role}</h3>
                    <p>{bio}</p>
                </div>

                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">Articles</span>
                        <span className="stat-value">{stats.articles}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Followers</span>
                        <span className="stat-value">{stats.followers}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Rating</span>
                        <span className="stat-value">{stats.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;