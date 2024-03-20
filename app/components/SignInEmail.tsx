import React, { useState } from "react";
import useAuth from "@/lib/useAuth";

const SignInEmail = () => {
	const { signInWithEmail, error } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signInWithEmail(email, password);
	};

	return (
		<div>
			<form onSubmit={handleSignIn}>
				<div>
					<label htmlFor="email">メールアドレス：</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">パスワード</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Emailでサインインする</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default SignInEmail;
