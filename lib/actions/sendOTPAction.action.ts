"use server";

import transporter from "@/lib/nodemailer";

const styles = {
	container: "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
	heading: "font-size:20px;color:#333;",
	paragraph: "font-size:16px;",
    code: "font-size:24px;font-weight:bold;letter-spacing:5px;display:block;margin:20px 0;text-align:center;background:#f4f4f4;padding:10px;border-radius:4px;"
};

export async function sendOTPAction({
	to,
	otp,
}: {
	to: string;
	otp: string;
}) {
	const mailOptions = {
		from: process.env.NODEMAILER_USER,
		to,
		subject: `SecureStart - Your 2FA Code`,
		html: `
    <div style="${styles.container}">
      <h1 style="${styles.heading}">Two-Factor Authentication</h1>
      <p style="${styles.paragraph}">Here is your one-time verification code:</p>
      <div style="${styles.code}">${otp}</div>
      <p style="${styles.paragraph}">This code will expire shortly.</p>
    </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (err) {
		console.error("[SendOTP]:", err);
		return { success: false };
	}
}
