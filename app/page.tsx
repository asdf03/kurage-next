"use client";

import TodoApp from "../components/TodoApp";
import useAuth from "@/lib/useAuth";
import SignInEmail from "@/components/SignInEmail";

const Home = () => {
	const { session: isLogin } = useAuth();

	return isLogin ? (
		<div>
			<h2>Todoアプリ</h2>
			<TodoApp />
		</div>
	) : (
		<div>
			<h2>ログイン</h2>
			<SignInEmail />
		</div>
	);
}

export default Home;
