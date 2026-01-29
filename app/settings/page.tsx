import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { Fade } from "@/components/shared/Fade";

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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Account Settings</h1>
        
        <Fade>
          <div className="space-y-6">
            {/* Other settings can go here */}
            
            <TwoFactorSettings initialEnabled={user.twoFactorEnabled} />
          </div>
        </Fade>
      </div>
    </div>
  );
}
