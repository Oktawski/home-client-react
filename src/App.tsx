import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { BrowserRouter, Router, Routes } from 'react-router-dom';
import { authenticationService } from './services/authentication.service';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home';
import { Box } from '@mui/material';
import { TopBar } from './components/TopBar';
import { Products } from './components/groceries/Products';

function App() {

    useEffect(() => {
        if (!authenticationService.isLoggedIn)
            authenticationService.logout();
    }, []);

    return (
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" 
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route path="/products" 
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;
