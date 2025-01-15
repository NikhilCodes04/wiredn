import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default role
        technologicalStack: '',
        phoneNumber: '',
        id: '' // Use a generic 'id' field to accommodate both studentId and mentorId
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // For redirecting after successful signup

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'technologicalStack') {
            setFormData({
                ...formData,
                [name]: value
                    .split(',')
                    .map((item) => item.trim()) // Trim each item
                    .filter((item) => item !== '') // Remove empty items
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);

            // On success, save the token (if provided)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Save token in localStorage
            }

            setSuccess(response.data.message);

            // Optionally redirect to the login page or dashboard
            setTimeout(() => {
                navigate('/login'); // Redirect user to login page after successful signup
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
        <div id="semi-circle1"></div>
        <div id="semi-circle2"></div>
        <div className="signup-container">
            
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                </select>

                {/* Conditional Rendering for ID Field */}
                {formData.role === 'student' && (
                    <input
                        type="text"
                        name="id"
                        placeholder="Student ID"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                )}
                {formData.role === 'mentor' && (
                    <input
                        type="text"
                        name="id"
                        placeholder="Mentor ID"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="text"
                    name="technologicalStack"
                    placeholder="Technological Stack (comma-separated)"
                    value={formData.technologicalStack}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    );
};

export default Signup;
