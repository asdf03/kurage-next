import supabase, { Database } from "./supabase";

const TABLE_NAME = "todo-app";

type UpdateProps = {
    id: string;
    status: string;
};

// データの更新
export const updateSupabaseData = async ({
    id,
    status,
}: UpdateProps) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ status })
            .match({ id });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
};
