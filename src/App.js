import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Homepage from './Components/homepage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Define the different routes */}
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;
