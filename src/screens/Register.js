import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);  // Stores success/error messages
    const [isError, setIsError] = useState(false); // Tracks if it's an error
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        if (!username || !password) {
            setMessage("Username and password are required.");
            setIsError(true);
            return;
        }

        setIsLoading(true); // Set loading state

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setMessage("User registered successfully.");
            setIsError(false);
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Error registering user. Please try again.");
            setIsError(true);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setMessage(null)} // Clear message when user starts typing
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setMessage(null)} // Clear message when user starts typing
                    className="w-full p-2 border rounded mb-2"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {/* Inline Message Display */}
            {message && (
                <p className={`mt-3 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Register;