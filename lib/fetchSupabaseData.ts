import supabase from "./supabase"

const TABLE_NAME = "todo-app"

export interface Todo {
    id: string
	title: string
	description: string
	status: string
	due_date: string
	created_at: string
	parent_id: string
    children?: Todo[];
}

export const fetchSupabaseData = async (statusFilter: String | null = null) => {
    try {
        let query = supabase.from(TABLE_NAME).select("*")
        if (statusFilter === 'done') {
            query = query.eq('status', 'done')
        }
        
        const { data, error } = await query
        if (error) {
            throw error;
        }
        if (!data) {
            return undefined;
        }

        const todoMap: Record<string, Todo> = {}
        data.forEach(todo => {
            todo.children = [];
            todoMap[todo.id] = todo;    
        });

        data.forEach(todo => {
            if (todo.parent_id && todoMap[todo.parent_id]) {
                todoMap[todo.parent_id].children?.push(todo);
            }
        });

        const rootTodos: Todo[] = data.filter(todo => !todo.parent_id);

        return rootTodos
    } catch (error) {
        console.error(error)
    }
}
