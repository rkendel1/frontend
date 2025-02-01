import React, { useState } from "react";

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecipes = () => {
        setLoading(true);
        setError(null);

        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }

        fetch("http://127.0.0.1:8000/api/recipes/recipe_list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch recipes");
            }
            return response.json();
        })
        .then(data => {
            setRecipes(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            setError(error.message);
            setLoading(false);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Saved Recipes</h1>
            <button
                onClick={fetchRecipes}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Load My Recipes
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {recipes.length === 0 && !loading && !error ? (
                <p>No recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="border p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold break-words">{recipe.url}</h2>
                            <p><strong>Ingredients:</strong> {recipe.ingredients || "Not available"}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions || "Not available"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedRecipes;