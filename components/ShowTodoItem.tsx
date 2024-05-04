// components/TodoItem.tsx
import React from 'react';
import { Todo } from "@/lib/fetchSupabaseData";
import AddTodo from "./AddTodo";

interface ShowTodoItemProps {
    todo: Todo;
    clickCheckBox: (id: string, status: string) => void;
    addChildTodo: (id: string) => void;
    activeId: string | null;
    setTodoTableData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ShowTodoItem: React.FC<ShowTodoItemProps> = ({ todo, clickCheckBox, addChildTodo, activeId, setTodoTableData }) => {
    return (
        <>
            <div className="todo-item" key={todo.id}>
                <div>
                    <button onClick={() => addChildTodo(todo.id)}>＋</button>
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
