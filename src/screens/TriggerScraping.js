import React, { useState } from 'react';
import axios from 'axios';

const TriggerScrapeAllButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Function to handle triggering scraping for all recipes
    const triggerAllScrapes = async () => {
        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/recipes/trigger_all_scrapes/', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming JWT token is stored in localStorage
                }
            });
            
            if (response.status === 202) {
                setMessage('Scraping triggered for all recipes!');
            }
        } catch (err) {
            setError('Failed to trigger scraping. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={triggerAllScrapes}
                disabled={isLoading}
                className="trigger-scrape-button"
            >
                {isLoading ? 'Triggering Scrape...' : 'Trigger Scraping for All Recipes'}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default TriggerScrapeAllButton;