// src/apiConfig.js

const apiConfig = {
    baseURL: window.location.origin.includes('localhost') 
        ? "http://localhost:8080" 
        : "https://wiredn.onrender.com"
};

export default apiConfig;
