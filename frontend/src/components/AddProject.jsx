import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProject.css';
import Sidebar from './Dashboard/Sidebar';

const AddProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !technologies) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');

        const projectData = {
            name,
            description,
            technologies: technologies.split(',').map((tech) => tech.trim()), // Convert comma separated string to an array
        };

        try {
            const response = await fetch('${config.baseURL}/api/project/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token in the headers
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const data = await response.json();
            alert(data.message);
            navigate('/projects'); // Redirect to the list of projects or wherever you want after successful project creation
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='projects-container'>
        <Sidebar/>  
        <div className="add-project-container">
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit} className="add-project-form">
                <div className="form-group">
                    <label>Project Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Technologies (comma separated):</label>
                    <input
                        type="text"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        placeholder="Enter technologies"
                        required
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <div className="form-group">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddProject;
