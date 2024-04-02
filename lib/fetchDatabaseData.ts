import supabase, { Database } from "./supabase";

const TABLE_NAME = "todo-app";

export const fetchDatabase = async () => {
    try {
        const { data } = await supabase.from(TABLE_NAME).select("*");
        return data;
    } catch (error) {
        console.error(error);
    }
};
