// client/src/components/TodoWrapped.jsx
import React from 'react';
import {TodosProvider2} from "./TodoProvider";
import Todo from "./TodoComponent";

const TodoWrapped = () => {
    return (
        <TodosProvider2>
            <Todo/>
        </TodosProvider2>
    );
};

export default TodoWrapped;