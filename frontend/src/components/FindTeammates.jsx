import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FindTeammates.css';
import './FindMentor.css';

const FindTeammates = () => {
    const { projectId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectName, setProjectName] = useState(''); // State to store project name

    const role = localStorage.getItem('role'); // Assume role is stored in localStorage

    // Fetch students and project details
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project details to get the name
                const projectResponse = await fetch(`https://wiredn.onrender.com/api/project/${projectId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!projectResponse.ok) {
                    throw new Error('Failed to fetch project data');
                }

                const projectData = await projectResponse.json();
                setProjectName(projectData.project.name); // Set the project name

                // Fetch students
                const studentResponse = await fetch('https://wiredn.onrender.com/api/user/students', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!studentResponse.ok) {
                    throw new Error('Failed to fetch students');
                }

                const studentsData = await studentResponse.json();
                //console.log(studentsData); // Log the data to check its structure
                setStudents(studentsData.students);
                setLoading(false);
            } catch (error) {
                setError('There was an error fetching the data. Please try again later.');
                console.error(error); // Log the error for debugging
                setLoading(false);
            }
        };


        fetchData();
    }, [projectId]);

    const handleConnect = async (receiverId) => {
        try {
            const response = await fetch('https://wiredn.onrender.com/api/request/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ receiverId, projectId, type: 'teammate_request' }),
            });

            if (!response.ok) {
                throw new Error('Failed to send connection request');
            }

            const data = await response.json();
            alert(data.message); // Notify the user about the request status
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="find-teammates-container">
            <div className="find-teammates-content">
                <h2>Find Teammates for Project: {projectName || 'Loading project name...'}</h2> {/* Show project name */}

                {role === 'student' && (
                    <>
                        <h3>Find Teammates</h3>
                        <ul className="user-list">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <li key={student._id} className="user-card">
                                        <h3>{student.name}</h3>
                                        <p><strong>Email:</strong> {student.email}</p>
                                        <p><strong>Skills:</strong> {student.technologicalStack.join(', ')}</p>
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleConnect(student._id)}
                                        >
                                            Connect
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No students found for this project.</p>
                            )}

                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default FindTeammates;
