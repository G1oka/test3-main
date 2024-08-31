import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Product Management App</h1>
                </header>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/upload" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
