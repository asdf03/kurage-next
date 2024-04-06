"use client";

import supabase, { Database } from "@/lib/supabase"
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"
import { updateSupabaseData } from "@/lib/updateSupabaseData"
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import AddTodo from "./AddTodo";
import { todo } from "node:test";

const TABLE_NAME = "todo-app";

const TodoApp = () => {
	const [messageText, setMessageText] = useState<Database[]>([]);
	const currentTodos = fetchSupabaseData();
	const { session: isLogin } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLogin) {
			router.push("/");
		}
	}, [isLogin, router]);

	const fetchRealtimeData = () => {
		try {
			supabase
				.channel("table_postgres_changes")
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: TABLE_NAME,
					},
					(payload) => {
						if (payload.eventType === "INSERT") {
							console.log('payload', payload);
							const { id, title, description, status, due_date, created_at } = payload.new;
							setMessageText((messageText) => [...messageText, { id, title, description, status, due_date, created_at }]);
						}
					}
				)
				.subscribe();

				return() => supabase.channel("table_postgres_changes").unsubscribe();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
        (async () => {
            let allMessage = await fetchSupabaseData();
            if (allMessage) {
                // titleで降順にソート
                allMessage.sort((a, b) => b.title.localeCompare(a.title));
                setMessageText(allMessage as Database[]);
            }
        })();
        fetchRealtimeData();
    }, []);

	const clickCheckBox = async (id: string, status: string) => {

		await updateSupabaseData({ id: id, status: status === "done" ? "todo" : "done" });
		const allMessage = await fetchSupabaseData();
		if (allMessage) {
			// titleで降順にソート
			allMessage.sort((a, b) => b.title.localeCompare(a.title));
			setMessageText(allMessage as Database[]);
		}
		setMessageText(allMessage as Database[]);


		console.log('============');
		console.log(messageText);
		console.log('============');

	};

	return (
		<div>
			{messageText.map((item) => (
				<div key={item.id}>
					<div>
					<button onClick={() => clickCheckBox(item.id, item.status)}>
						{item.status === "done" ? "☑" : "□"}
					</button>
					</div>
					<p>Title: {item.title}</p>
				</div>
			))}
			<AddTodo />
		</div>
	);
};

export default TodoApp;