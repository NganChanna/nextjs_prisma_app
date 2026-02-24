"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";

import SocialLogin from "./SocialLogin";

export function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		startTransition(async () => {
			await signIn.email(
				{ email, password },
				{
					onStart: () => toast.loading("Authenticating..."),
					onSuccess: async (ctx: any) => {
						if ((ctx.data as any).twoFactorRedirect) {
							router.push("/two-factor");
							toast.dismiss();
							toast.message("Two-factor authentication required");
							return;
						}
						router.push("/");
						toast.dismiss();
						toast.success("Welcome back!");
					},
					onError: (ctx: any) => {
						toast.dismiss();
						toast.error(ctx.error.message || "Failed to login");
					},
				},
			);
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col gap-6 w-full relative z-10"
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

			<div className="glass-card rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl bg-[#0a0a0f]/60">
				<div className="p-8 sm:p-12 w-full max-w-md mx-auto relative">
					<form onSubmit={handleSubmit} className="flex flex-col gap-6">
						<div className="flex flex-col items-center text-center mb-4">
							<h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
							<p className="text-muted-foreground font-medium">Enter your credentials to continue</p>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white/80 font-semibold ml-1">Email</Label>
								<Input
									id="email"
									type="email"
									disabled={isPending}
									name="email"
									placeholder="name@example.com"
									required
									className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all"
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between ml-1">
									<Label htmlFor="password" className="text-white/80 font-semibold">Password</Label>
									<Link href="/forget-password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
										Forgot password?
									</Link>
								</div>
								<Input
									id="password"
									disabled={isPending}
									type="password"
									name="password"
									required
									placeholder="••••••••"
									className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all tracking-widest"
								/>
							</div>
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-base hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(139,92,246,0.3)] mt-2"
						>
							Sign In
						</Button>

						<div className="relative my-4 flex items-center justify-center">
							<div className="absolute inset-0 flex items-center px-1">
								<div className="w-full border-t border-white/10"></div>
							</div>
							<div className="relative bg-[#0a0a0f] px-4 text-xs font-semibold uppercase text-muted-foreground tracking-widest rounded-full border border-white/5 py-1">
								Or Continue With
							</div>
						</div>

						<SocialLogin />

						<div className="text-center text-sm font-medium mt-2 text-muted-foreground">
							Don't have an account?{" "}
							<Link href="/signup" className="text-primary hover:text-primary/80 font-bold transition-colors">
								Create one
							</Link>
						</div>
					</form>
				</div>
			</div>
		</motion.div>
	);
}
