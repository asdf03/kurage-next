import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import { Database } from "@/lib/supabase"
import { addSupabaseData } from '../lib/addSupabaseData'
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"

type Props = {
    setTodoTableData: (value: Database[]) => void
    addChildTodo?: (id: string) => void;
    parentTodoId?: string | null
}

const AddTodo: React.FC<Props> = ({ setTodoTableData, addChildTodo, parentTodoId = null }) => {
    const [inputValue, setInputValue] = useState<string>('')
    
    const handleBlur = async () => {
        if (addChildTodo) addChildTodo('')
        if(!inputValue.trim()) return
        if (parentTodoId === null) {
            await addSupabaseData({
                title: inputValue,
                parent_id: '',
            })
        } else {
            await addSupabaseData({
                title: inputValue,
                parent_id: parentTodoId,
            })
        }
        setInputValue('')
        const supabaseData = await fetchSupabaseData()
        setTodoTableData(supabaseData as Database[])
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            await handleBlur()
        }
    }

    if (parentTodoId) {
        return (
            <div className="add-todo">
                <input
                    id="focus-add-todo"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="タスクを追加"
                    className="add-todo-inner"
                />
            </div>
        )
    } else {
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
        )
    }
}

export default AddTodo;
