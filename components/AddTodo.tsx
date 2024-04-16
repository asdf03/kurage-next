import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Database } from "@/lib/supabase"
import { addSupabaseData } from '../lib/addSupabaseData';
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"

type Props = {
    setTodoTableData: (value: Database[]) => void;
}

const AddTodo: React.FC<Props> = ({ setTodoTableData }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleBlur = async () => {
        if(!inputValue.trim()) return;
        await addSupabaseData({
            title: inputValue,
        });
        setInputValue('');
        const supabaseData = await fetchSupabaseData();
        if (supabaseData) {
            supabaseData.sort((a, b) => a.created_at.localeCompare(b.created_at));
            setTodoTableData(supabaseData as Database[]);
        }
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
        <div className="add-todo">
            <input
            	type="text"
            	value={inputValue}
            	onChange={handleChange}
            	onBlur={handleBlur}
            	onKeyDown={handleKeyDown}
            	placeholder="タスクを追加"
            	className="add-todo-inner"
        	/>
        </div>
    );
}

export default AddTodo;
