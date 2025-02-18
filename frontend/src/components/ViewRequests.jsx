import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewRequests.css";
import config from "../apiConfig"; 
const ViewRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token"); // Get token for authorization

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${config.baseURL}/api/requests/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequests(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching requests:", err);
                setError("Failed to load requests.");
                setLoading(false);
            }
        };

        fetchRequests();
    }, [token]);

    const handleRequestAction = async (requestId, status) => {
        try {
            const response = await axios.patch(
                `${config.baseURL}/api/requests/${requestId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message);

            // Update UI after response
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req._id === requestId ? { ...req, status } : req
                )
            );
        } catch (err) {
            console.error("Error updating request status:", err);
            alert("Failed to update request status.");
        }
    };

    if (loading) return <p>Loading requests...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="view-requests-container">
            <h2>Manage Your Requests</h2>
            {requests.length === 0 ? (
                <p>No requests to display.</p>
            ) : (
                <ul className="request-list">
                    {requests.map((request) => (
                        <li key={request._id} className="request-card">
                            <h3>{request.type === "mentor" ? "Mentorship Request" : "Teammate Request"}</h3>
                            <p><strong>Sender:</strong> {request.senderId}</p>
                            <p><strong>Project:</strong> {request.projectId}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            {request.status === "pending" && (
                                <div className="actions">
                                    <button
                                        className="btn-accept"
                                        onClick={() => handleRequestAction(request._id, "accepted")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn-decline"
                                        onClick={() => handleRequestAction(request._id, "rejected")}
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

export default ViewRequests;
