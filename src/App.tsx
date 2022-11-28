import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { BrowserRouter, Router, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
