import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h2>Welcome to the Product Management App</h2>
            <Link to="/upload">Upload a New Product</Link>
        </div>
    );
}

export default HomePage;
