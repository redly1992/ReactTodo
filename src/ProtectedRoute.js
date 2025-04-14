// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React from 'react'; // Add React import

const ProtectedRoute = () => {
    const { user } = useAuth();

    console.log(111, user);
    // If not logged in, redirect to /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, render the child routes
    return <Outlet />;
};


export default ProtectedRoute;