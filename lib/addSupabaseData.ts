import supabase, { Database } from "./supabase";

const TABLE_NAME = "todo-app";

type InsertProps = Pick<Database, "title" | "parent_id">;

export const addSupabaseData = async ({
	title,
	parent_id,
}: InsertProps) => {
	try {
		await supabase.from(TABLE_NAME).insert({ title, parent_id });
	} catch (error) {
		console.error(error);
	}
};