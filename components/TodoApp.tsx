"use client";

import supabase, { Database } from "@/lib/supabase"
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/addSupabaseData"
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import AddTodo from "./AddTodo";

const TodoApp = () => {
	const [messageText, setMessageText] = useState<Database[]>([]);
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
			const allMessage = await fetchDatabase();
			setMessageText(allMessage as Database[]);
		})();
		fetchRealtimeData();
	}, []);

	return (
		<div>
			{messageText.map((item) => (
				<div key={item.id}>
					<p>Title: {item.title}</p>
				</div>
			))}
			<AddTodo />
		</div>
	);
};

export default TodoApp;