import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_TRAP_HOST as string,
	port: parseInt(process.env.MAIL_TRAP_PORT as string),
	auth: {
		user: process.env.MAIL_TRAP_USER as string,
		pass: process.env.MAIL_TRAP_PASS as string,
	},
});

export async function sendEmail(to: string, subject: string, html: string) {
	const info = await transporter.sendMail({
		from: '"No Reply Next Todo App" <no-reply@next-todo-app.com>',
		to,
		subject,
		html,
	});
	console.log("Message sent:", info.messageId);
}
