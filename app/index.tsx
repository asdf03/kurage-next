import TodoApp from "../components/TodoApp";
import useAuth from "@/lib/useAuth";

const Home = () => {
	const { session: isLogin } = useAuth();

	return isLogin ? (
		<div>
			<h2>Todoアプリ</h2>
			<TodoApp />
		</div>
	) : (
		<div>
			<h2>Todoアプリ</h2>
			<TodoApp />
		</div>
	);
}

export default Home;
