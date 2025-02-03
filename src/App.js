import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './components/Dashboard';
import AddRecipe from './screens/AddRecipe';
import SavedRecipes from './screens/SavedRecipes';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />      
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                    <Route path="/saved-recipes" element={<SavedRecipes />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;