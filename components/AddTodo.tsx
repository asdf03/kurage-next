import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { addSupabaseData } from '../lib/addSupabaseData';
import { updateSupabaseData } from "@/lib/updateSupabaseData";

interface ChildProps {
    updateScreen: () => void;
}

const AddTodo: React.FC<ChildProps> = ({ updateScreen }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleBlur = async () => {
        if(!inputValue.trim()) return;
        await addSupabaseData({
            title: inputValue,
        });
        setInputValue('');
        updateScreen();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleBlur();
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
