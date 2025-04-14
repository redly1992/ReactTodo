import React from "react";
import {Provider, useSelector} from "react-redux";
import {todoStore} from "./TodoStore";

export function useTodoSelector() {
    return useSelector((state) => state.todos.items);
}

export function useTodoLoading() {
    return useSelector((state) => state.todos.loading);
}

export function useTodoDeleting() {
    return useSelector((state) => state.todos.deleting);
}

export function TodosProvider2({ children }) {
    return (
        <Provider store={todoStore}>
            {children}
        </Provider>
    )
}