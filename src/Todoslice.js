// src/features/todos/todosSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import axios from 'axios'; // For HTTP requests

// Fetch todos from server
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('https://dummyjson.com/todos'); // Replace with your API
    return response.data.todos;
});

// Add a new todo to server
export const addTodoToServer = createAsyncThunk('todos/addTodoToServer', async (todo) => {
    const response = await axios.post('https://dummyjson.com/todos/add', todo); // Replace with your API
    return response.data;
});

// Add a new todo to server
export const deleteTodoFromServer = createAsyncThunk('todos/deleteTodoFromServer', async (todo) => {
    const response = await axios.delete(`https://dummyjson.com/todos/${todo.id}`); // Replace with your API
    return response.data;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        deleting: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Handle fetchTodos
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle addTodoToServer
            .addCase(addTodoToServer.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTodoToServer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addTodoToServer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete todo
            .addCase(deleteTodoFromServer.pending, (state, action) => {
                const id = action.meta.arg.id; // Get the ID from the thunk argument
                state.deleting[id] = true; // Set loading state for this item
            })
            .addCase(deleteTodoFromServer.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                state.deleting[id] = false; // Clear loading state
            })
            .addCase(deleteTodoFromServer.rejected, (state, action) => {
                const id = action.meta.arg.id;
                state.deleting[id] = false; // Clear loading state on error
                state.error = action.error.message;
            });;
    },
});

export default todosSlice.reducer;