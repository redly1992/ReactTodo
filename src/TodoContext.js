import React, {createContext, useReducer} from "react";
import {ADD_TODO, DELETE_TODO, EDIT_TODO} from "./TodosAction";

export const TodosContext = createContext(null);

export const TodosDispatchContext = createContext(null);

const todoReducer = (todos, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return [...todos, {
                id: action.payload.id,
                text: action.payload.text,
                done: false
            }];
        }
        case EDIT_TODO: {
            return todos.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case DELETE_TODO: {
            return todos.filter(t => t.id !== action.payload.id);
        }
        default:
            return todos;
    }
}

export function TodosProvider({ children }) {
    const [todos, todosDispatch] = useReducer(todoReducer, [{id: 1, text: '123'}]);

    return (
        <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={todosDispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    )
}