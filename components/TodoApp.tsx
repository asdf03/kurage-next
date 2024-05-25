"use client";

import { Todo } from "@/lib/todo"
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"
import { updateSupabaseData } from "@/lib/updateSupabaseData"
import { deleteSupabaseData } from "@/lib/deleteSupabaseData";
import useAuth from "@/lib/useAuth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import AddTodo from "./AddTodo"
import ShowTodoItem from "./ShowTodoItem"; 

const TodoApp = () => {
	const [todoTableData, setTodoTableData] = useState<Todo[]>([])
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
			setTodoTableData(supabaseData as Todo[])
		})();
	}, []);

	useEffect(() => {
		if (activeId) {	
			const focusElement = document.getElementById('focus-add-todo');
			if (focusElement) {
				focusElement.focus();
			}
		}
	}, [activeId])

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
			setTodoTableData(supabaseData as Todo[])
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

	const deleteLocalTodo = (todos: Todo[], id: String): Todo[] => {
		return todos
			.filter(todo => todo.id != id)
			.map(todo => ({
				...todo,
				children: todo.children ? deleteLocalTodo(todo.children, id) : []
			}))
			.filter(todo => todo.children && todo.children.length < 0 || todo.id !== id)
	}

	const deleteTodo = async (id: string) => {
		let filteredTodoData = deleteLocalTodo(todoTableData, id)
		console.log(filteredTodoData)
		setTodoTableData(filteredTodoData)
		await deleteSupabaseData(id)
		let supabaseData = await fetchSupabaseData()
		setTodoTableData(supabaseData as Todo[])
	}

	return (
		<div>
			{todoTableData.map((item) => (
				 <ShowTodoItem
					key={item.id}
					todo={item}
					clickCheckBox={clickCheckBox}
					deleteTodo={deleteTodo}
					addChildTodo={addChildTodo}
					activeId={activeId}
					setTodoTableData={setTodoTableData}
				/>
			))}
			<AddTodo setTodoTableData={setTodoTableData} />
		</div>
	)
}

export default TodoApp;
