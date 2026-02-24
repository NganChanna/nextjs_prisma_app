import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { token, error } = searchParams;

  if (error) {
    return (
      <div className="flex w-full items-center justify-center p-6 md:p-10 pt-16 sm:pt-24 pb-32">
        <div className="w-full max-w-sm md:max-w-md glass-card rounded-[2rem] p-8 border border-red-500/20 shadow-[0_8px_32px_0_rgba(239,68,68,0.2)] text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Encountered</h2>
          <p className="text-muted-foreground/80 mb-8">{error}</p>
          <Link href="/forget-password" className="relative group w-full block">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <button className="relative w-full px-6 py-3 rounded-full bg-[#0a0a0f] text-white font-bold hover:bg-white/5 transition-colors border border-white/10">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex w-full items-center justify-center p-6 md:p-10 pt-16 sm:pt-24 pb-32">
        <div className="w-full max-w-sm md:max-w-md glass-card rounded-[2rem] p-8 border border-red-500/20 shadow-[0_8px_32px_0_rgba(239,68,68,0.2)] text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Invalid Link</h2>
          <p className="text-muted-foreground/80 mb-8">The password reset link is invalid or has expired.</p>
          <Link href="/forget-password" className="relative group w-full block">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <button className="relative w-full px-6 py-3 rounded-full bg-[#0a0a0f] text-white font-bold hover:bg-white/5 transition-colors border border-white/10">
              Request New Link
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10 pt-16 sm:pt-24 pb-32">
      <div className="w-full max-w-sm md:max-w-xl">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
