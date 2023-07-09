export default function SelectedProfile({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<hr />
			<p>{params.id}</p>
		</div>
	);
}
