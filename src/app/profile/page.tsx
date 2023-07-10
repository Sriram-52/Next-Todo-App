"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
	const router = useRouter();
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get("/api/auth/me");
				console.log(response);
				setUserId(response.data.user._id);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleLogout = async () => {
		try {
			const response = await axios.post("/api/auth/logout");
			console.log(response);
			router.push("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<hr />
			{userId && (
				<Link href={`/profile/${userId}`}>
					<p className="text-blue-500 cursor-pointer">View Profile</p>
				</Link>
			)}
			<button
				className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
}
