"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { twoFactor } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function TwoFactorVerifyForm() {
  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsPending(true);
    try {
      const { data, error } = await twoFactor.verifyOtp({
        code,
        trustDevice: true, // Optional: trust this device for 30 days
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful");
      router.push("/"); 
      router.refresh();
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    setIsPending(true);
    try {
        const { error } = await twoFactor.sendOtp();
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("OTP sent to your email");
        }
    } catch (err) {
        toast.error("Failed to send OTP");
    } finally {
        setIsPending(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-center">
          Enter the verification code sent to your email or app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Login"}
          </Button>
          <div className="text-center">
            <Button 
                type="button" 
                variant="link" 
                className="text-sm text-muted-foreground"
                onClick={handleResend}
                disabled={isPending}
            >
                Didn't receive a code? Resend via Email
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
