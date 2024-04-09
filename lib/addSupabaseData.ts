import supabase, { Database } from "./supabase";
import 

const TABLE_NAME = "todo-app";

type InsertProps = Pick<Database,"title" | "created_at">;

export const addSupabaseData = async ({
	title,
	created_at = "a",
}: InsertProps) => {
	try {
		await supabase.from(TABLE_NAME).insert({ title, created_at });
	} catch (error) {
		console.error(error);
	}
};