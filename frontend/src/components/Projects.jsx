import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Projects.css';
import Sidebar from './Dashboard/Sidebar';
import Topbar from './Dashboard/Topbar';
import config from "../apiConfig"; 
export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in local storage');
                }

                const response = await fetch(`${config.baseURL}/api/project`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Fixed template literal
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await response.json();
                setProjects(data.projects || []); // Safeguard for empty data
                setLoading(false);
            } catch (err) {
                setError(err.message || 'An unexpected error occurred');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter projects based on the search term
    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projects">
            <Sidebar />
            <Topbar />
            <div className="projects-content">
                <h2>Find Projects</h2>

                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                {/* Loading/Error State */}
                {loading && <p>Loading projects...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                {/* Project List */}
                <ul className="project-list">
                    {filteredProjects.map((project) => (
                        <li
                            key={project._id}
                            onClick={() => navigate(`/projects/${project._id}`)} // Fixed navigation syntax
                            className="project-item"
                        >
                            <h3>{project.name}</h3>
                            <p>{project.description.slice(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;
