import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { Fade } from "@/components/shared/Fade";

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  // Fetch fresh user data to get 2FA status
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorEnabled: true },
  });

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="w-full h-full pb-32 pt-8">
      {/* Background glow specific to settings */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <Fade>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">Account Settings</h1>
            <p className="text-lg text-muted-foreground">Manage your identity and security preferences.</p>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Other settings can go here */}

            <div className="glass-card rounded-[2rem] border border-white/10 p-8 sm:p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Security</h2>
                  <p className="text-sm text-muted-foreground font-medium mt-1">Protect your account with Two-Factor Authentication</p>
                </div>
              </div>

              <TwoFactorSettings initialEnabled={user.twoFactorEnabled} />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
