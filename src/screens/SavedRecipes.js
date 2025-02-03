import React, { useState, useEffect } from "react";

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Automatically fetch recipes when component mounts
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);

        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/recipes/recipe_list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recipes.");
            }

            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Saved Recipes</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {recipes.length === 0 && !loading && !error ? (
                <p>No recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((recipe) => (
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