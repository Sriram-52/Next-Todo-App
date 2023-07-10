import { connect } from "@/db/config";
import { decodeToken } from "@/helpers/jwt";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
	const token = request.cookies.get("token")?.value ?? "";
	if (!token) {
		return NextResponse.json({ message: "Not logged in" }, { status: 401 });
	}
	const decodedValue = decodeToken(token);
	const user = await User.findById({ _id: decodedValue.id }).select(
		"-password"
	);
	if (!user) {
		return NextResponse.json({ message: "Not logged in" }, { status: 401 });
	}
	return NextResponse.json({ user });
}
