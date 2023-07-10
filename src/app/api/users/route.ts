import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/email";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
	try {
		const { email, password, username } = await request.json();
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = new User({
			email,
			password: hashedPassword,
			username,
		});
		const savedUser = await newUser.save();
		await sendVerificationEmail(savedUser);
		return NextResponse.json({ user: savedUser }, { status: 201 });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 400 });
		}
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}

async function sendVerificationEmail(user: any) {
	// generate token
	const token = crypto.randomBytes(32).toString("hex");
	// set token expiry
	const tokenExpiry = Date.now() + 3600000; // 1 hour
	// update user
	user.verifiedToken = token;
	user.verifiedTokenExpiry = tokenExpiry;
	user.verified = false;
	await user.save();
	// send email
	const subject = "Verify your email";
	const html = `
		<h1>Verify your email</h1>
		<p>Click <a href="${process.env.DOMAIN_NAME}/verify-email?token=${token}">here</a> to verify your email</p>
	`;
	// send email
	await sendEmail(user.email, subject, html);
}
