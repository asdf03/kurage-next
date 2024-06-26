// components/TodoItem.tsx
import React from 'react';
import { Todo } from "@/lib/todo";
import AddTodo from "./AddTodo";

interface ShowTodoItemProps {
    todo: Todo;
    clickCheckBox: (id: string, status: string) => void;
    deleteTodo: (id: string) => void;
    addChildTodo: (id: string) => void;
    activeId: string | null;
    setTodoTableData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ShowTodoItem: React.FC<ShowTodoItemProps> = ({ todo, clickCheckBox, deleteTodo, addChildTodo, activeId, setTodoTableData }) => {
    return (
        <>
            <div className="todo-item" key={todo.id}>
                <div>
                    <button onClick={() => addChildTodo(todo.id)}>＋</button>
                    <button onClick={() => deleteTodo(todo.id)}>ー</button>
                    <button onClick={() => clickCheckBox(todo.id, todo.status)}>
                        {todo.status === "done" ? "✔" : "◯"}
                    </button>
                </div>
                <p className={todo.status === 'done' ? 'done-todo' : ''}>{todo.title}</p>
            </div>
            {activeId === todo.id && (
                <AddTodo setTodoTableData={setTodoTableData} addChildTodo={addChildTodo} parentTodoId={todo.id} />
            )}
            <div className='child-todo'>
                {todo.children && todo.children.map(child => (
                    <ShowTodoItem
                        key={child.id}
                        todo={child}
                        clickCheckBox={clickCheckBox}
                        deleteTodo={deleteTodo}
                        addChildTodo={addChildTodo}
                        activeId={activeId}
                        setTodoTableData={setTodoTableData}
                    />
                ))}
            </div>
        </>
    );
};

export default ShowTodoItem;
