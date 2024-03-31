import supabase, { Database } from "./supabase";

export const TABLE_NAME = "todo-app";

export const fetchDatabase = async () => {
	try {
    const { data } = await supabase.from(TABLE_NAME).select("*");
    return data;
  } catch (error) {
    console.error(error);
  }
};

type InsertProps = Pick<Database,"title">;

export const addSupabaseData = async ({
	title,
}: InsertProps) => {
	try {
		await supabase.from(TABLE_NAME).insert({ title });
	} catch (error) {
		console.error(error);
	}
};