// import React from 'react';
import './Sidebar.css';
// import './Dashboard.css';
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
            <Link to="/dashboard">
                <li>Dashboard</li>
                </Link>
                
            <Link to="/projects">
                <li>Projects</li>
                </Link>
            <Link to="/requests">
                <li>Requests</li>
                </Link>
            <Link to="/add-project">
                <li>Add Project</li>
                </Link>

                
                <li>Schedule</li>
                <li>Explore</li>
                <li>Projects</li>
                <li>Progress</li>
                <li>Settings</li>
            </ul>
        </div>
    );
}

export default Sidebar;