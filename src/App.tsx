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

function App() {

    // useEffect(() => {
    //     console.log(authenticationService.getAuthToken());
    // }, []);

    return (
        <BrowserRouter>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
