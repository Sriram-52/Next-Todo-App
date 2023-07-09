import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
	try {
		const { email, password, username } = await request.json();
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{
					error: "User already exists",
				},
				{
					status: 400,
				}
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
		return NextResponse.json(
			{
				message: "User created successfully",
				user: savedUser,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 500,
				}
			);
		}
		return NextResponse.json(
			{
				message: "Something went wrong",
			},
			{
				status: 500,
			}
		);
	}
}
