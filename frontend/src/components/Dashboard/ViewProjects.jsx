// import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ProjectPage from './ProjectPage'
import './Dashboard.css';

function ViewProjects() {
    return (
        <div>
            <Sidebar />
            <Topbar />
            <ProjectPage />
        </div>
    );
}

export default ViewProjects;
