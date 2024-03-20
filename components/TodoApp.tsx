"use client";

import supabase, { Database } from "@/lib/supabase"
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions"
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

const TodoApp = () => {
	const [inputText, setInputText] = useState("");
	const [messageText, setMessageText] = useState<Database[]>([]);
	const { session: isLogin, userProfile } = useAuth();
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

	const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => setInputText(() => event.target.value);

	const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (inputText === "") return;
		// addSupabaseData({ ...userProfile });
		setInputText("");
	};

	return (
		<div>
			{messageText.map((item) => (
				<div key={item.id}>
					<p>{item.id}</p>
					<p>{item.title}</p>
					<p>{item.description}</p>
					<p>{item.status}</p>
					<p>{item.due_date}</p>
					<p>{item.created_at}</p>
				</div>
			))}

			<form onSubmit={onSubmitNewMessage}>
				<input type="text" name="title" value={inputText} onChange={onChangeInputText} aria-aria-label="タイトル" />
				<input type="description" name="description" value={inputText} onChange={onChangeInputText} aria-aria-label="詳細" />
				<input type="status" name="status" value={inputText} onChange={onChangeInputText} aria-aria-label="進捗" />
				<input type="due_date" name="due_date" value={inputText} onChange={onChangeInputText} aria-aria-label="完了予定" />
				<button type="submit" disabled={inputText === ""}>送信</button>
			</form>
		</div>
	);
};

export default TodoApp;