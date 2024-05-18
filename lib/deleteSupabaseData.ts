import supabase, { Database } from "./supabase"

const TABLE_NAME = "todo-app"

const getAllChildIds = async (parentId: string): Promise<string[]> => {
    let ids = [parentId]
    let pendingIds = [parentId]

    while (pendingIds.length > 0) {
        const currentId = pendingIds.pop()
        
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('id')
            .eq('parent_id', currentId)

        if (error) {
            console.error('Error fetching child ids:', error)
            return []
        }

        if (data) {
            const childIds = data.map(item => item.id)
            ids.push(...childIds)
            pendingIds.push(...childIds)
        }
    }

    return ids
}

export const deleteSupabaseData = async (id: string) => {
    try {
        const idsToDelete = await getAllChildIds(id);
        const orCondition = idsToDelete.map(id => `id.eq.${id}`).join(',')
        await supabase.from(TABLE_NAME).delete().or(orCondition)
    } catch (error) {
		console.error(error);
	}
}