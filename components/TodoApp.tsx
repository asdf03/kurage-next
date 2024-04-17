"use client";

import { Database } from "@/lib/supabase"
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"
import { updateSupabaseData } from "@/lib/updateSupabaseData"
import useAuth from "@/lib/useAuth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import AddTodo from "./AddTodo"

const TodoApp = () => {
	const [todoTableData, setTodoTableData] = useState<Database[]>([])
	const [activeId, setActiveId] = useState<string | null>(null);
	const { session: isLogin } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLogin) {
			router.push("/")
		}
	}, [isLogin, router])

	useEffect(() => {
        (async () => {
			let supabaseData = await fetchSupabaseData()
			if (supabaseData) {
				supabaseData.sort((a, b) => a.created_at.localeCompare(b.created_at))
				setTodoTableData(supabaseData as Database[])
			}
		})();
	}, []);

	const clickCheckBox = async (id: string, status: string) => {
		await setTodoTableData(todoTableData.map(todo => {
			if (todo.id === id) {
				return { ...todo, status: status === "done" ? "todo" : "done"};
			}
			return todo;
		}));

		try {
			await updateSupabaseData({ id: id, status: status === "done" ? "todo" : "done" })
			const supabaseData = await fetchSupabaseData()
			if (supabaseData) {
				supabaseData.sort((a, b) => a.created_at.localeCompare(b.created_at))
				setTodoTableData(supabaseData as Database[])
			}
			setTodoTableData(supabaseData as Database[])
		} catch (error) {
			setTodoTableData(todoTableData.map(todo => {
				if(todo.id === id) {
					return { ...todo, status: status === "done" ? "todo" : "done"}
				}
				return todo
			}))
		}
	}

	const addChildTodo = (id: string) => {
		setActiveId(activeId === id ? null : id)
	}

	return (
		<div>
			{todoTableData.map((item) => (
				<>
					<div className="todo-item" key={item.id} >
						<div>
							<button onClick={() => addChildTodo(item.id)}>＋</button>
							<button onClick={() => clickCheckBox(item.id, item.status)}>
								{item.status === "done" ? "✔" : "◯"}
							</button>
						</div>
						<p className={item.status === 'done' ? 'done-todo' : ''}>{item.title}</p>
					</div>
					{activeId === item.id && (
						<AddTodo setTodoTableData={setTodoTableData} parentTodoId={item.id} />
					)}
				</>
			))}
			<AddTodo setTodoTableData={setTodoTableData} />
		</div>
	)
}

export default TodoApp;
