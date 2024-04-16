import { Database } from "@/lib/supabase"
import React, { useEffect, useState } from "react"
import { fetchSupabaseData } from "@/lib/fetchSupabaseData"

const DoneTodo = () => {
    const [doneTodoTableData, setDoneTodoTableData] = useState<Database[]>([]);

    useEffect(() => {
        (async () => {
			let supabaseData = await fetchSupabaseData('done')
			if (supabaseData) {
				supabaseData.sort((a, b) => a.created_at.localeCompare(b.created_at))
				setDoneTodoTableData(supabaseData as Database[])
			}
		})();
	}, []);


	return (
		<div>
			{doneTodoTableData.map((item) => (
				<div className="todo-item" key={item.id}>
					<p>✔：{item.title}</p>
				</div>
			))}
		</div>
	)
}

export default DoneTodo