"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { signUpAction } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SocialLogin from "./SocialLogin";

export function SignupForm() {
	const [state, action, pending] = useActionState(signUpAction, undefined);
	const router = useRouter();

	useEffect(() => {
		if (state?.success) {
			toast.success(state.message);
			router.push("/");
		}

		if (state?.error) {
			toast.error(state.error, {
				icon: <AlertCircle className="h-4 w-4" />,
			});
		}
	}, [state, router]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			className="flex flex-col gap-6 w-full relative z-10"
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

			<div className="glass-card rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl bg-[#0a0a0f]/60">
				<div className="p-8 sm:p-12 w-full max-w-md mx-auto relative">
					<form action={action} className="flex flex-col gap-5">
						<div className="flex flex-col items-center text-center mb-2">
							<h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Account</h1>
							<p className="text-muted-foreground font-medium">Join us and start your journey</p>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-white/80 font-semibold ml-1">Full Name</Label>
								<Input
									id="name"
									type="text"
									name="name"
									disabled={pending}
									defaultValue={state?.data?.name || ""}
									placeholder="John Doe"
									required
									className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white/80 font-semibold ml-1">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									defaultValue={state?.data?.email || ""}
									disabled={pending}
									placeholder="name@example.com"
									required
									className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="password" className="text-white/80 font-semibold ml-1">Password</Label>
									<Input
										id="password"
										name="password"
										type="password"
										disabled={pending}
										required
										placeholder="••••••••"
										className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all tracking-widest"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword" className="text-white/80 font-semibold ml-1">Confirm</Label>
									<Input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										disabled={pending}
										required
										placeholder="••••••••"
										className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-xl h-12 px-4 transition-all tracking-widest"
									/>
								</div>
							</div>
						</div>

						<Button
							type="submit"
							disabled={pending}
							className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-base hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(139,92,246,0.3)] mt-2"
						>
							{pending ? "Signing up..." : "Create Account"}
						</Button>

						<div className="relative my-3 flex items-center justify-center">
							<div className="absolute inset-0 flex items-center px-1">
								<div className="w-full border-t border-white/10"></div>
							</div>
							<div className="relative bg-[#0a0a0f] px-4 text-xs font-semibold uppercase text-muted-foreground tracking-widest rounded-full border border-white/5 py-1">
								Or Continue With
							</div>
						</div>

						<SocialLogin />

						<div className="text-center text-sm font-medium mt-1 text-muted-foreground">
							Already have an account?{" "}
							<Link href="/signin" className="text-primary hover:text-primary/80 font-bold transition-colors">
								Sign In
							</Link>
						</div>
					</form>
				</div>
			</div>
		</motion.div>
	);
}
