import { useState } from 'react';
import './NavBar.css';

export function NavBar({ head, text, button, buttonAction, iconAction }) {
    return (
        <nav className="top-navbar">

            <div className="header-title">
                <i class="bi bi-arrow-left" onClick={(iconAction)}></i>
                <div>
                    <h1>{head}</h1>
                    <p>{text}</p>
                </div>
            </div>
            <div className="nav-search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search data..." />
            </div>


            <div className="nav-actions">
                <button onClick={buttonAction} className="btn-primary">
                    <i class="bi bi-plus-lg"></i>
                    <span>{button}</span>
                </button>
                <i className="fa-regular fa-bell notification-icon"></i>
                <div className="user-pill">

                    <div className="user-info">
                        <p className="user-name">Thomas Anree</p>
                        <p className="user-role">UX Designer</p>
                    </div>
                    <img
                        src="https://i.pravatar.cc/150?u=thomas"
                        className="user-avatar"
                        alt="user"
                    />
                </div>

            </div>

        </nav>
    );
}