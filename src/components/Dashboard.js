import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="text-center" role="main">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
            <div className="space-y-3">
                <Link to="/add-recipe" className="block bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
                    Add Recipe
                </Link>
                <Link to="/saved-recipes" className="block bg-green-500 text-white p-3 rounded hover:bg-green-600">
                    View Saved Recipes
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;