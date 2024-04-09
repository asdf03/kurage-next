import supabase, { Database } from "./supabase";

const TABLE_NAME = "todo-app";

type InsertProps = Pick<Database, "title">;

export const addSupabaseData = async ({
	title,
}: InsertProps) => {
	try {
		await supabase.from(TABLE_NAME).insert({ title });
	} catch (error) {
		console.error(error);
	}
};