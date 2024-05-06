import supabase, { Database } from "./supabase"

const TABLE_NAME = "todo-app"

export const deleteSupabaseData = async (id: string) => {
    try {
        await supabase.from(TABLE_NAME).delete().eq('id', id)
    } catch (error) {
		console.error(error);
	}
}