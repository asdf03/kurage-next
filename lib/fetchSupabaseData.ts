import supabase from "./supabase"

const TABLE_NAME = "todo-app"

export const fetchSupabaseData = async (statusFilter: String | null = null) => {
    try {
        let query = supabase.from(TABLE_NAME).select("*")
        if (statusFilter === 'done') {
            query = query.eq('status', 'done')
        }
        const { data } = await query
        return data
    } catch (error) {
        console.error(error)
    }
}
