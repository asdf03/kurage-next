import { useState } from "react";

// 引数として受け取ったpropsオブジェクト内のonAddプロパティにアクセスしている
const AddTodo = ({ onAdd }) => {
    // useState は2要素の配列(現在の状態の値, 値を更新する関数)を返す
    const [inputValue, setInputValue] = useState('');

    // handleBlurという関数は、一般的にblurイベント(ユーザーが要素からフォーカスを移動させた時に発生)
    // にトリガーされる関数の名前
    const handleBlur = () => {
        // スペース、タブ、改行を無効化するためにtrim関数を使用する
        if(!inputValue.trim()) return;
        onAdd(inputValue);
        setInputValue('');
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="タスクを追加"
            className="todo-input"
        />
    );
}

export default AddTodo;


