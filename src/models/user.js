import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please provide a email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: {
		type: String,
		default: null,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
		default: null,
	},
	verifiedToken: {
		type: String,
		default: null,
	},
	verifiedTokenExpiry: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	updatedAt: {
		type: Date,
		default: null,
	},
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
