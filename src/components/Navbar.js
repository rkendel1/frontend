import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <h1 className="text-lg font-bold">
                <Link to="/" className="text-white">Recipe App</Link>
            </h1>
            <div className="space-x-4">
                <Link to="/dashboard" className="px-3 hover:bg-gray-700 rounded" aria-label="Go to Dashboard">Dashboard</Link>
                <Link to="/add-recipe" className="px-3 hover:bg-gray-700 rounded" aria-label="Add a new Recipe">Add Recipe</Link>
                <Link to="/saved-recipes" className="px-3 hover:bg-gray-700 rounded" aria-label="View Saved Recipes">Saved Recipes</Link>
                <Link to="/login" className="px-3 hover:bg-gray-700 rounded" aria-label="Login to your account">Login</Link>
                <Link to="/register" className="px-3 hover:bg-gray-700 rounded" aria-label="Create a new account">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;