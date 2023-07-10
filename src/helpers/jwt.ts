import jwt from "jsonwebtoken";

export function decodeToken(token: string) {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("Missing JWT_SECRET env variable");
	}
	const decodedValue: any = jwt.verify(token, secret);
	return {
		id: decodedValue.id,
		email: decodedValue.email,
		username: decodedValue.username,
	};
}
