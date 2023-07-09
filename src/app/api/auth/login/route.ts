import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{
					message: "Wrong email",
				},
				{
					status: 400,
				}
			);
		}
		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) {
			return NextResponse.json(
				{
					message: "Wrong password",
				},
				{
					status: 400,
				}
			);
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json(
			{
				message: "Logged in successfully",
				user,
			},
			{
				status: 200,
			}
		);
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
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
