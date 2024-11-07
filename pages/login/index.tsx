import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username === "influencer" && password === "1") {
			router.push("/play/0");
		} else if (username === "normal" && password === "2") {
			router.push("/play/1");
		} else {
			setErrorMessage("Invalid username or password. Try again.");
		}
	};

	const handleBack = () => {
		router.push("/");
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Login</h1>
			<p className={styles.advice}>
				Use a conta <strong>influencer</strong> com password <strong>1</strong>{" "}
				para ganhar todas as rodadas. Use a conta <strong>normal</strong> com
				password <strong>2</strong> para experimentar o jogo normal.
			</p>

			<form onSubmit={handleLogin} className={styles.form}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className={styles.input}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={styles.input}
					required
				/>
				<button type="submit" className={styles.loginButton}>
					Login
				</button>
				<button
					type="button"
					onClick={handleBack}
					className={styles.backButton}
				>
					Voltar
				</button>
			</form>

			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</div>
	);
}
