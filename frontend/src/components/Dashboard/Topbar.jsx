// import React from 'react';
import './Topbar.css';
import './Dashboard.css';
// import logo from "../../../public/logo.png"

import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

function Topbar() {
    let token = localStorage.getItem('token');
    let decoded;

    if (token) {
        decoded = jwtDecode(token);
    }
    //console.log(decoded);

    // Get current date in "dd Month" format
    const currentDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
    }).format(new Date());

    return (
        <div className="topbar">
            <div className="left-header">
                <img src="../../../public/logo.png" id="wired-logo" alt="Logo" />
                <div id="search-box">
                    <button id="search-button">
                        <img src="../../../public/glass.png" id="search-button-image" alt="Search" />
                    </button>
                    <input type="text" placeholder="search something" id="search-input-box" />
                </div>
            </div>
            <div className="right-header">
                <img src="../../../public/notificationhollow.png" id="notification-icon" alt="Notification" />
                <div id="l2">
                    <img src="../../../public/userhollow.png" id="user-icon" alt="User" />
                    <div style={{ lineHeight: "16px" }}>
                        <p style={{ fontSize: "14px" }}>Hello</p>
                        {/* Use the name from decoded token */}
                        <p style={{ fontSize: "16px", fontWeight: 500 }}>
                            {decoded?.name || "Guest"} 
                        </p>
                    </div>
                </div>
                <div id="l3">
                    <img src="../../../public/calendar.png" alt="Calendar" />
                    <p>{currentDate}</p> {/* Display the current date */}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
