"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { forgetPassword } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

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
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto w-full">
        <CardContent className="pt-6 pb-8 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-muted-foreground">
            We have sent a password reset link to your email address.
          </p>
          <Button asChild className="w-full mt-4">
            <Link href="/signin">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isPending}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending link..." : "Send Reset Link"}
          </Button>
          <div className="text-center mt-4">
            <Link
              href="/signin"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
