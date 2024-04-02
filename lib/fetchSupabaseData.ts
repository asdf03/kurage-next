import supabase from "./supabase";

const TABLE_NAME = "todo-app";

export const fetchSupabaseData = async () => {
    try {
        const { data } = await supabase.from(TABLE_NAME).select("*");
        return data;
    } catch (error) {
        console.error(error);
    }
};
