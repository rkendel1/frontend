import React from 'react';
import Register from './screens/Register';
import Login from './screens/Login';
import AddRecipe from './screens/AddRecipe';
import SavedRecipes from './screens/SavedRecipes';

const App = () => {
    return (
        <div>
            <h1>Simple Auth App</h1>
            <Register />
            <Login />
            <AddRecipe />
            <SavedRecipes />
        </div>
    );
};

export default App; 