import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Sidebar from './Dashboard/Sidebar';
import './FindTeammates.css';

const FindMentor = () => {
    const { projectId } = useParams();
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //const role = localStorage.getItem('role'); // Assume role is stored in localStorage

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const mentorResponse = await fetch('https://wiredn.onrender.com/api/user/mentors', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!mentorResponse.ok) {
                    throw new Error('Failed to fetch mentors');
                }

                const mentorsData = await mentorResponse.json();
                setMentors(mentorsData.mentors);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const handleConnect = async (receiverId) => {
        try {
            const response = await fetch('https://wiredn.onrender.com/api/request/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ receiverId, projectId, type: 'mentor_request' }),
            });

            if (!response.ok) {
                throw new Error('Failed to send connection request');
            }

            const data = await response.json();
            alert(data.message);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="find-teammates-container">
            {/* <Sidebar /> */}
            <div className="find-teammates-content">
                <h2>Find Mentors for Project: {projectId}</h2>

                <h3>Find Mentors</h3>
                <ul className="user-list">
                    {mentors.map((mentor) => (
                        <li key={mentor._id} className="user-card">
                            <h3>{mentor.name}</h3>
                            <p><strong>Email:</strong> {mentor.email}</p>
                            <p><strong>Expertise:</strong> {mentor.technologicalStack.join(', ')}</p>
                            <button
                                className="btn-secondary"
                                onClick={() => handleConnect(mentor._id)}
                            >
                                Request Guidance
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FindMentor;
