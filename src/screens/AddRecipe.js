import React, { useState } from 'react';

function AddRecipe() {
    // State to store form data and messages
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!url.trim()) {
            setMessage("Recipe URL is required.");
            setIsError(true);
            setLoading(false);
            return;
        }

        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("User is not authenticated. Please log in.");
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            await addRecipe(token, { url });
            setMessage("Recipe added successfully!");
            setIsError(false);
            setUrl('');
        } catch (err) {
            setMessage("Failed to add recipe. Please try again.");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    // API call function
    async function addRecipe(token, recipeData) {
        const apiUrl = 'http://127.0.0.1:8000/api/recipes/';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recipeData)
        });

        if (!response.ok) {
            throw new Error('Failed to add recipe');
        }
        return await response.json();
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>

            {/* Inline Message Display */}
            {message && (
                <p className={`mb-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="url" className="block text-sm font-medium">
                        Recipe URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Adding Recipe...' : 'Add Recipe'}
                </button>
            </form>
        </div>
    );
}

export default AddRecipe;