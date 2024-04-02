import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { addSupabaseData } from '../lib/addSupabaseData';

// 引数として受け取ったpropsオブジェクト内のonAddプロパティにアクセスしている
const AddTodo: React.FC = () => {
    // useState は2要素の配列(現在の状態の値, 値を更新する関数)を返す
    const [inputValue, setInputValue] = useState<string>('');

    // handleBlurという関数は、一般的にblurイベント(ユーザーが要素からフォーカスを移動させた時に発生)
    // にトリガーされる関数の名前
    const handleBlur = async () => {
        // スペース、タブ、改行を無効化するためにtrim関数を使用する
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
