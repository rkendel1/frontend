import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setMessage("Username and password are required.");
            setIsError(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', { username, password });
            const token = response.data.access;
            localStorage.setItem('token', token);
            setMessage("Logged in successfully.");
            setIsError(false);
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Invalid credentials. Please try again.");
            setIsError(true);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <button 
                onClick={handleLogin} 
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Login
            </button>

            {/* Inline Message Display */}
            {message && (
                <p className={`mt-3 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;