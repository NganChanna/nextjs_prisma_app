"use client";

import { CheckCircle, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth-client";

interface ResetPasswordFormProps {
	token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [isPending, setIsPending] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget);

		const password = String(formData.get("password"));
		if (!password) {
			return toast.error("Please enter your password.");
		}

		const confirmPassword = String(formData.get("confirmPassword"));

		if (password !== confirmPassword) {
			return toast.error("Passwords do not match.");
		}

		await resetPassword({
			newPassword: password,
			token,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (ctx: { error: { message: string } }) => {
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					toast.success("Password reset successfully.");
					setIsSuccess(true);
				},
			},
		});
	}

	// Success state
	if (isSuccess) {
		return (
			<div className="glass-card w-full border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-500">
				{/* Background Gradients */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>

				<div className="text-center space-y-6">
					<div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
						<CheckCircle className="h-8 w-8 text-green-400" />
					</div>
					<h2 className="text-3xl font-black text-white px-2">Password Reset Complete</h2>
					<p className="text-muted-foreground/80 leading-relaxed px-4">
						Your password has been successfully reset. You can now securely sign in to the platform.
					</p>
					<div className="pt-4">
						<Link href="/signin" className="relative group w-full block">
							<div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
							<button className="relative w-full px-6 py-4 rounded-full bg-white text-black font-black hover:scale-[1.02] active:scale-[0.98] transition-all">
								Continue to Sign In
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="glass-card w-full border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
				{/* Background Gradients */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>

				<div className="mb-10 text-center">
					<div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
						<KeyRound className="h-8 w-8 text-primary opacity-80" />
					</div>
					<h1 className="text-3xl font-black tracking-tight text-white mb-2">Reset Password</h1>
					<p className="text-muted-foreground/80 text-sm">
						Enter your new secure password below to restore access.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-6">
						{/* Password Field */}
						<div className="grid gap-2">
							<label htmlFor="password" className="text-xs font-bold text-white/80 uppercase tracking-widest ml-1">New Password</label>
							<div className={`relative group ${isPending ? "cursor-not-allowed opacity-50" : ""}`}>
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
									<Lock className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
								</div>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									name="password"
									disabled={isPending}
									placeholder="Enter your new password"
									className="pl-12 pr-12 py-6 bg-black/40 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-2xl transition-all shadow-inner w-full"
									required
									minLength={6}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-white transition-colors focus:outline-none"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
							<p className="text-xs text-muted-foreground/60 ml-2 mt-1">Must be at least 6 characters long</p>
						</div>

						{/* Confirm Password Field */}
						<div className="grid gap-2 mt-2">
							<label htmlFor="confirmPassword" className="text-xs font-bold text-white/80 uppercase tracking-widest ml-1">Confirm New Password</label>
							<div className={`relative group ${isPending ? "cursor-not-allowed opacity-50" : ""}`}>
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
									<Lock className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
								</div>
								<Input
									id="confirmPassword"
									type={showPassword ? "text" : "password"}
									name="confirmPassword"
									disabled={isPending}
									placeholder="Confirm your new password"
									className="pl-12 pr-12 py-6 bg-black/40 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-2xl transition-all shadow-inner w-full"
									required
									minLength={6}
								/>
							</div>
						</div>

						{/* Submit Button */}
						<div className={`pt-4 ${isPending ? "cursor-not-allowed" : ""}`}>
							<div className="relative group">
								<div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
								<button
									type="submit"
									disabled={isPending}
									className="relative w-full px-6 py-4 rounded-full bg-white text-black font-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
								>
									{isPending ? "Resetting Protocol..." : "Secure Password Reset"}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ResetPasswordForm;
