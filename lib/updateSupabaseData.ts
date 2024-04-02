import supabase, { Database } from "./supabase";

const TABLE_NAME = "todo-app";

type UpdateProps = {
    id: number;
    title: string;
};

// データの更新
export const updateSupabaseData = async ({
    id,
    title,
}: UpdateProps) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ title })
            .match({ id });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
};
