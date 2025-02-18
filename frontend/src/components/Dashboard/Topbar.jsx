// import React from 'react';
import './Topbar.css';
import './Dashboard.css';
// import logo from "../../../public/logo.png";

import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

import logo from "../../../public/logo.png";
import glass from "../../../public/glass.png";
import notificationHollow from "../../../public/notificationhollow.png";
import userHollow from "../../../public/userhollow.png";
import calendar from "../../../public/calendar.png";
import {useNavigate} from "react-router-dom";

function Topbar() {
    let token = localStorage.getItem('token');
    let decoded;

    if (token) {
        decoded = jwtDecode(token);
    }

    const navigate = useNavigate();
    //console.log(decoded);

    // Get current date in "dd Month" format
    const currentDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
    }).format(new Date());

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        localStorage.removeItem('role'); // Clear role (if stored)
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="topbar">
            <div className="left-header">
                <img src={logo} id="wired-logo" alt="Logo" />
                <div id="search-box">
                    <button id="search-button">
                        <img src={glass} id="search-button-image" alt="Search" />
                    </button>
                    <input type="text" placeholder="search something" id="search-input-box" />
                </div>
            </div>
            <div className="right-header">
                <img src={notificationHollow} id="notification-icon" alt="Notification" />
                <div id="l2">
                    <img src={userHollow} id="user-icon" alt="User" />
                    <div style={{ lineHeight: "16px" }}>
                        <p style={{ fontSize: "14px" }}>Hello</p>
                        {/* Use the name from decoded token */}
                        <p style={{ fontSize: "16px", fontWeight: 500 }}>
                            {decoded?.name || "Guest"} 
                        </p>
                    </div>
                </div>
                <div id="l3">
                    <img src={calendar} alt="Calendar" />
                    <p>{currentDate}</p> {/* Display the current date */}
                </div>
                <button id="logout-button" onClick={handleLogout}>
                Logout
                </button>
            </div>
        </div>
    );
}

export default Topbar;
