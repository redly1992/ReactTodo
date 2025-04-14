import {useAuth} from "./AuthContext";
import TodoWrapped from "./TodoWrapped";
import Login from "./Login";
import React from 'react';

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            {user ? <TodoWrapped/> : <Login/>}
        </>
    );
};

export default Home;