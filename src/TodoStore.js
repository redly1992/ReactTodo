// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Todoslice';

export const todoStore = configureStore({
    reducer: {
        todos: todosReducer,
    },
});