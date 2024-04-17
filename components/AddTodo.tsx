import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Database } from "@/lib/supabase"
import { addSupabaseData } from '../lib/addSupabaseData';
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"

type Props = {
    setTodoTableData: (value: Database[]) => void
    parentTodoId?: string | null
}

const AddTodo: React.FC<Props> = ({ setTodoTableData, parentTodoId = null }) => {
    const [inputValue, setInputValue] = useState<string>('');
    
    const handleBlur = async () => {
        if(!inputValue.trim()) return;
        if (parentTodoId === null) {
            await addSupabaseData({
                title: inputValue,
                parent_id: '',
            });
        } else {
            await addSupabaseData({
                title: inputValue,
                parent_id: parentTodoId,
            });
        }
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
