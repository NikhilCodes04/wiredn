import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Sidebar from './Dashboard/Sidebar';
import './ProjectDetails.css'; // Import CSS for styling

const ProjectDetails = () => {
    const { id } = useParams(); // Get project ID from URL
    const navigate = useNavigate(); // For navigation
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/project/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token from local storage
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch project details');
                }

                const data = await response.json();
                setProject(data.project); // Set project details
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!project) {
        return <p>Project details not available.</p>;
    }

    return (
        <div className="project-details-container">
            {/* <Sidebar /> */}
            <div className="project-details-card">
                <h2>{project.name}</h2>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                <p><strong>Mentor:</strong> {project.mentor?.name ?? 'N/A'} ({project.mentor?.email ?? 'N/A'})</p>
                <p><strong>Team Members:</strong> {project.teamMembers.map(member => member.name).join(', ')}</p>
                <p><strong>Created By:</strong> {project.createdBy.name} ({project.createdBy.email})</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>

                {/* Action Buttons */}
                <div className="actions">
                    <button className="edit">Edit Project</button>
                    <button className="btn-secondary">Delete Project</button>
                    <button 
                        className="btn-primary" 
                        onClick={() => navigate(`/projects/${id}/find-teammates`)}
                    >
                        Find Teammates
                    </button>
                    <button 
                        className="btn-primary" 
                        onClick={() => navigate(`/projects/${id}/find-mentor`)}
                    >
                        Find Mentor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
