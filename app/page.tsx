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
			
			<style jsx global>{`
				div {
					margin: 10px;
					border: 1px solid #000;
					background: #fff;
				}
				* {
					color: #000;
				}
				input {
					border: 1px solid #000;
				}
			`}</style>
		</div>
	) : (
		<div>
			<h2>ログイン</h2>
			<SignInEmail />
		</div>
	);


}

export default Home;
