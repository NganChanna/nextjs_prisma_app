"use server";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

import { type ErrorCode, auth } from "@/lib/auth";

type ActionState =
	| {
			error?: string;
			success?: boolean;
			message?: string;
			data?: {
				name?: string;
				email?: string;
			};
	  }
	| undefined;

export async function signUpAction(prevState: ActionState, formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("name") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (password !== confirmPassword) {
		return {
			error: "Passwords do not match",
			success: false,
		};
	}
	try {
		await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
			},
			headers: await headers(),
		});

		return {
			success: true,
			message: "Sign up successful! Please check your email to verify your account.",
		};
	} catch (err) {
		console.error("Signup error:", err);
		if (err instanceof APIError) {
			const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

			switch (errCode) {
				case "USER_ALREADY_EXISTS":
					return { error: "User already exists with this email.", success: false, data: { name, email } };
				default:
					return { error: err.message || "An error occurred during sign up", success: false, data: { name, email } };
			}
		}
		return {
			success: false,
			error: err instanceof Error ? err.message : "An unexpected error occurred during sign up",
			data: { name, email },
		};
	}
}
