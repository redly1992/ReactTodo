import React from 'react';
import './index.css';
import {AuthProvider} from "./AuthContext";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Counter from "./Counter";
import Product from "./product/Product";
import Skeleton from "./Skeleton";
import Home from "./Home";
import TodoWrapped from "./TodoWrapped";

const App = ({initialData = {}}) => {
    return (
        <AuthProvider>
            <Skeleton>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/product/:id" element={<Product initialData={initialData}/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/counter" element={<Counter/>}/>
                        <Route path="/todo" element={<TodoWrapped/>}/>
                    </Route>
                </Routes>
            </Skeleton>
        </AuthProvider>
    );
};

export default App;
