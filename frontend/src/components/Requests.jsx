import { useState, useEffect } from 'react';
import './Requests.css';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('https://wiredn.onrender.com/api/request/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch requests');
                }

                const data = await response.json();
                setRequests(data.requests); // Use the "requests" field from the response
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleUpdateStatus = async (requestId, status) => {
        try {
            const response = await fetch(`https://wiredn.onrender.com/api/request/update/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update request status');
            }

            const data = await response.json();
            alert(data.message);

            // Refresh the list of requests after updating
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req._id === requestId ? { ...req, status } : req
                )
            );
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div className="requests-container"><p>Loading requests...</p></div>;
    }

    if (error) {
        return <div className="requests-container"><p>Error: {error}</p></div>;
    }

    // Filter out accepted and rejected requests
    const filteredRequests = requests.filter(request => request.status !== 'accepted' && request.status !== 'rejected');

    return (
        <div className="requests-container">
            <h2>Requests</h2>
            {filteredRequests.length === 0 ? (
                <p>No pending requests available</p>
            ) : (
                <ul className="requests-list">
                    {filteredRequests.map((request) => (
                        <li key={request._id} className="request-card">
                            <h3>Request ID: {request._id}</h3>
                            <p><strong>Sender:</strong> {request.senderId.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {request.senderId.email || 'N/A'}</p>
                            <p><strong>Project:</strong> {request.projectId?.name || 'N/A'}</p>
                            <p><strong>Type:</strong> {request.type}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            {request.status === 'pending' && (
                                <div className="request-actions">
                                    <button
                                        className="btn-accept"
                                        onClick={() => handleUpdateStatus(request._id, 'accepted')}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn-decline"
                                        onClick={() => handleUpdateStatus(request._id, 'rejected')}
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Requests;
