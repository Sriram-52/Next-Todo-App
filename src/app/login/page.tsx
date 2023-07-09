"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type LoginUserDto = {
	email: string;
	password: string;
};

export default function Signup() {
	const [user, setUser] = React.useState<LoginUserDto>({
		password: "",
		email: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// const res = await axios.post("/api/users", user);
		// console.log(res);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Login</h1>
			<hr />
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<input
					className="border border-gray-400 rounded-md p-2 mb-2"
					type="email"
					placeholder="Enter your email"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<input
					className="border border-gray-400 rounded-md p-2 mb-2"
					type="password"
					placeholder="Enter your password"
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<button
					className="border border-gray-400 rounded-lg focus:outline-none p-2 mb-2 "
					type="submit"
				>
					Login
				</button>
				<Link href="/signup">
					<p className="text-blue-500">Signup</p>
				</Link>
			</form>
		</div>
	);
}
