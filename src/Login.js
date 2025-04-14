// Login.jsx
import {useAuth} from './AuthContext';
import {Navigate, useNavigate} from 'react-router-dom';
import React from 'react';

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // If not logged in, redirect to /login
    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleLogin = () => {
        login({ id: 1, name: 'Test User' });
        navigate('/');
    };

    return (
        <div>
            <h1>Login Page1</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;