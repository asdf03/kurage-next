import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { addSupabaseData } from '../lib/addSupabaseData';

const AddTodo: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleBlur = async () => {
        if(!inputValue.trim()) return;
        await addSupabaseData({
            title: inputValue,
        });
        setInputValue('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            await handleBlur();
        }
    };

    return (
        <div>
            <input
            	type="text"
            	value={inputValue}
            	onChange={handleChange}
            	onBlur={handleBlur}
            	onKeyDown={handleKeyDown}
            	placeholder="タスクを追加"
            	className="todo-input"
        	/>
        </div>
    );
}

export default AddTodo;
