import React, { useEffect, useState } from 'react';
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

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        authenticationService.isLoggedInObservable.subscribe(value => {
            setIsLoggedIn(value);
        });
    }, []);

    return (
        <BrowserRouter>
            <TopBar isLoggedIn={ isLoggedIn } />
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
