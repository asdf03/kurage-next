import React, { useState, ChangeEvent, KeyboardEvent } from "react";
// TODO import { addSupabaseData } from '../path/to/your/supabase';

interface addTodoProps {
    onAdd: (todoText: string) => void
}

// 引数として受け取ったpropsオブジェクト内のonAddプロパティにアクセスしている
const AddTodo: React.FC<addTodoProps> = ({ onAdd }) => {
    // useState は2要素の配列(現在の状態の値, 値を更新する関数)を返す
    const [inputValue, setInputValue] = useState<string>('');

    // handleBlurという関数は、一般的にblurイベント(ユーザーが要素からフォーカスを移動させた時に発生)
    // にトリガーされる関数の名前
    const handleBlur = async () => {
        // スペース、タブ、改行を無効化するためにtrim関数を使用する
        if(!inputValue.trim()) return;
        await onAdd(inputValue);
        setInputValue('');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            await handleBlur();
        }
    };
    // TODO
    /*
    const addTodoItem = async (TodoText: string) => {
        const { data, error } = await supabase
            .from('todos')

    }
    */

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="タスクを追加"
            className="todo-input"
        />
    );
}

export default AddTodo;


