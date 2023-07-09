"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

type CreateUserDto = {
	username: string;
	password: string;
	email: string;
};

export default function Signup() {
	const [user, setUser] = React.useState<CreateUserDto>({
		username: "",
		password: "",
		email: "",
	});

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/users", user);
			console.log(res);
			router.push("/login");
		} catch (error) {
			console.error(error);
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message);
			} else if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred");
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Sign Up</h1>
			<hr />
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<input
					className="border border-gray-400 rounded-md p-2 mb-2 text-black"
					type="email"
					placeholder="Enter your email"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<input
					className="border border-gray-400 rounded-md p-2 mb-2 text-black"
					type="text"
					placeholder="Enter your name"
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
				<input
					className="border border-gray-400 rounded-md p-2 mb-2 text-black"
					type="password"
					placeholder="Enter your password"
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>

				<button
					className="border border-gray-400 rounded-lg focus:outline-none p-2 mb-2 "
					type="submit"
				>
					Sign Up
				</button>
				<Link href="/login">
					<p className="text-blue-500">Login</p>
				</Link>
			</form>
		</div>
	);
}
