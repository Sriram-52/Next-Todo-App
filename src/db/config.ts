import mongoose from "mongoose";

export async function connect() {
	try {
		const uri = process.env.MONGO_URI;
		if (!uri) {
			throw new Error("No URI");
		}
		await mongoose.connect(uri);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected");
		});

		connection.on("error", (err) => {
			console.log(
				"MongoDB connection error. Please make sure MongoDB is running. " + err
			);
			process.exit();
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error connecting to MongoDB");
	}
}
