import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		console.log("[verify-email] POST request");
		const { verifyToken } = await request.json();
		const user = await User.findOne({
			verifiedToken: verifyToken,
			// verifiedTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 400 }
			);
		}
		user.verifiedToken = null;
		user.verifiedTokenExpiry = null;
		user.verified = true;
		await user.save();
		return NextResponse.json({ message: "Email verified" }, { status: 200 });
	} catch (error) {
		console.error("[verify-email] error", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
