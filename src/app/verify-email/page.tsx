"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
	const [token, setToken] = useState<string | null>(null);
	const [isVerified, setIsVerified] = useState<boolean | null>(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");
		setToken(token);
	}, []);

	useEffect(() => {
		async function verifyEmail(verifyToken: string) {
			try {
				await axios.post("/api/auth/verify-email", {
					verifyToken,
				});
				setIsVerified(true);
			} catch (error) {
				console.error("[verify-email] page", error);
				setIsVerified(false);
			}
		}
		if (token?.length) {
			verifyEmail(token);
		}
	}, [token]);

	return (
		<div>
			<h1>Verify Email</h1>
			<p>Token: {token}</p>
			{isVerified === null ? (
				<p>Verifying...</p>
			) : isVerified ? (
				<p>Verified!</p>
			) : (
				<p>Failed to verify</p>
			)}
		</div>
	);
}
