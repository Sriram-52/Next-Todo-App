"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function SelectedProfile({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;
	const [profile, setProfile] = useState<any>(null);

	useEffect(() => {
		async function fetchProfile() {
			const response = await axios.get(`/api/auth/me`);
			setProfile(response.data.user);
		}

		fetchProfile();
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<hr />
			{profile && (
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<pre>
						<code>{JSON.stringify(profile, null, 2)}</code>
					</pre>
				</div>
			)}
		</div>
	);
}
