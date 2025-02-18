import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import "./Login.css"; 
import config from "../apiConfig";  // Import the config

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.baseURL}/api/auth/login`, { email, password });

            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);

            // Decode the token to extract the user role
            const decodedToken = jwtDecode(response.data.token);
            const userRole = decodedToken.role; // Extract role from the decoded token

            // Store the user role in localStorage
            localStorage.setItem("role", userRole);

            // Navigate to the dashboard after successful login
            navigate("/dashboard");
        } catch (error) {
            console.error("Login or authorization error:", error);
        }
    };

    return (
        <div>
            <div id="semi-circle1"></div>
            <div id="semi-circle2"></div>

            <div className="box">
                <p id="welcome">Welcome Back!</p>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email-input">Email / Username</label>
                    <input
                        type="text"
                        id="email-input"
                        placeholder="name@company.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        id="password-input"
                        placeholder="something@123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
