"use client";

import supabase, { Database } from "@/lib/supabase"
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions"
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

const TodoApp = () => {
	const [messageText, setMessageText] = useState<Database[]>([]);
	const { session: isLogin } = useAuth();
	const router = useRouter();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('');
	const [dueDate, setDueDate] = useState('');

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

	const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(() => event.target.value);

	const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (title === "") return;
		// addSupabaseData({ ...userProfile });
		setTitle("");
	};

	return (
		<div>
			{messageText.map((item) => (
				<div key={item.id}>
						<p>Title: {item.title}</p>
						<p>Discription: {item.description}</p>
				</div>
			))}

			<form onSubmit={onSubmitNewMessage}>
				<input
					type="text"
					name="title"
					value={title}
					onChange={onChangeInputText}
					aria-label="タイトル"
				/>
				<button type="submit" disabled={title === ""}>送信</button>
			</form>
		</div>
	);
};

export default TodoApp;