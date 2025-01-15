// import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Homepage from './Homepage'
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <Topbar />
            <Homepage />
        </div>
    );
}

export default Dashboard;
