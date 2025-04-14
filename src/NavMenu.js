import React from 'react';
import { Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "./AuthContext";

export default function NavMenu() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Menu items based on login status
    const items = user
        ? [
            {
                key: 'login',
                label: <Link to="/login">Login</Link>,
            },
            {
                key: 'counter',
                label: <Link to="/counter">Counter</Link>,
            },
            {
                key: 'todo',
                label: <Link to="/todo">Todo list</Link>,
            },
        ]
        : [
            {
                key: 'login',
                label: <Link to="/login">Login</Link>,
            },
        ];

    return (
        <>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                style={{ flex: 1, minWidth: 0, background: 'transparent' }}
            />
            {user && (
                <>
                    <p>Welcome, {user.name}!</p>
                    <Button type="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            )}
        </>
    );
}
