"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { forgetPassword } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Mail, Key } from "lucide-react";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    startTransition(async () => {
      try {
        const { error } = await forgetPassword({
          email,
          redirectTo: "/reset-password",
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        setIsSuccess(true);
        toast.success("Password reset link sent to your email.");
      } catch {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="glass-card w-full border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>

        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <Mail className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white px-2">Check your email</h2>
          <p className="text-muted-foreground/80 leading-relaxed px-4">
            We have sent a password reset link to your email address.
          </p>
          <div className="pt-4">
            <Link href="/signin" className="relative group w-full block">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <button className="relative w-full px-6 py-4 rounded-full bg-[#0a0a0f] text-white font-bold hover:bg-white/5 transition-colors border border-white/10 flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card w-full border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>

      <div className="mb-10 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
          <Key className="h-8 w-8 text-primary opacity-80" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white mb-2">Forgot Password</h2>
        <p className="text-muted-foreground/80 text-sm">
          Enter your email address to securely regain access to your dark crystal space.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-white/80 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
              <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isPending}
              className="pl-12 py-6 bg-black/40 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-2xl transition-all shadow-inner w-full"
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <button
              type="submit"
              disabled={isPending}
              className="relative w-full px-6 py-4 rounded-full bg-white text-black font-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isPending ? "Transmitting..." : "Send Reset Link"}
            </button>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-white/10">
          <Link
            href="/signin"
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors group"
          >
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-2 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-3 w-3" />
            </span>
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
