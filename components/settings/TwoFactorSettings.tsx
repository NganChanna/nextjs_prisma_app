"use client";

import { useState } from "react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { twoFactor } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

interface TwoFactorSettingsProps {
  initialEnabled: boolean;
}

export function TwoFactorSettings({ initialEnabled }: TwoFactorSettingsProps) {
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isPending, setIsPending] = useState(false);
  
  // State for flow management
  const [step, setStep] = useState<"idle" | "password" | "qr">("idle");
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [password, setPassword] = useState(""); 

  // 1. User clicks "Enable 2FA" -> Open Password Dialog
  const initiateEnable2FA = () => {
    setStep("password");
    setPassword(""); // Reset password field
  };

  // 2. User submits Password -> Call API -> Show QR Code
  const handleEnable2FA = async () => {
    if (!password) {
        toast.error("Password is required");
        return;
    }

    setIsPending(true);
    try {
      //  Pass the actual password state here
      const { data, error } = await twoFactor.enable({
        password: password, 
      });
      
      if (error) {
        // If password is wrong, better-auth returns an error here
        toast.error(error.message || "Incorrect password");
        return;
      }
      
      const uri = (data as any)?.totpURI;
      setSecret((data as any)?.secret || ""); 

      if (uri) {
        const url = await QRCode.toDataURL(uri);
        setQrCodeUrl(url);
        setStep("qr"); // Move to next step
      }
    } catch (err) {
      toast.error("Failed to initialize 2FA setup");
    } finally {
      setIsPending(false);
    }
  };

  // 3. User Scans QR & Enters Code -> Verify -> Finish
  const handleVerifyAndEnable = async () => {
    if (!verificationCode) {
        toast.error("Please enter the code from your app");
        return;
    }
    setIsPending(true);
    try {
      const { data, error } = await twoFactor.verifyTotp({
        code: verificationCode,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if ((data as any)?.backupCodes) {
          setBackupCodes((data as any).backupCodes);
      }
      
      setIsEnabled(true);
      setStep("idle"); // Close dialogs
      toast.success("Two-Factor Authentication enabled successfully!");
    } catch (err) {
      toast.error("Failed to verify code");
    } finally {
      setIsPending(false);
    }
  };

  const handleDisable2FA = async () => {
    const userPassword = prompt("Please enter your password to disable 2FA:");
    if (!userPassword) return;

    setIsPending(true);
    try {
        const { error } = await twoFactor.disable({
            password: userPassword
        });

        if (error) {
            toast.error(error.message);
            return;
        }
        
        setIsEnabled(false);
        setBackupCodes([]); // Clear backup codes
        toast.success("Two-Factor Authentication disabled.");
    } catch (err) {
        toast.error("An error occurred");
    } finally {
        setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEnabled ? <ShieldCheck className="text-green-500" /> : <ShieldAlert className="text-yellow-500" />}
          Two-Factor Authentication (2FA)
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account by enabling 2FA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEnabled ? (
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Your account is currently protected with Two-Factor Authentication.
                </p>
                {backupCodes.length > 0 && (
                    <div className="bg-muted p-4 rounded-md">
                        <p className="font-bold text-sm mb-2">Backup Codes (Save these safely!):</p>
                        <div className="grid grid-cols-2 gap-2">
                            {backupCodes.map((code, i) => (
                                <code key={i} className="text-xs bg-background p-1 rounded border">{code}</code>
                            ))}
                        </div>
                    </div>
                )}
                <Button variant="destructive" onClick={handleDisable2FA} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Disable 2FA
                </Button>
            </div>
        ) : (
            <div>
                <Button onClick={initiateEnable2FA} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enable 2FA
                </Button>

                {/* DIALOG 1: CONFIRM PASSWORD */}
                <Dialog open={step === "password"} onOpenChange={(open) => !open && setStep("idle")}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Password</DialogTitle>
                            <DialogDescription>
                                Please enter your current password to start 2FA setup.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                             <Label htmlFor="password-check">Password</Label>
                             <Input 
                                id="password-check"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Current password"
                             />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setStep("idle")}>Cancel</Button>
                            <Button onClick={handleEnable2FA} disabled={isPending || !password}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify Password
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* DIALOG 2: QR CODE SCAN */}
                <Dialog open={step === "qr"} onOpenChange={(open) => !open && setStep("idle")}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Scan QR Code</DialogTitle>
                            <DialogDescription>
                                Scan this QR code with your authenticator app.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex flex-col items-center gap-4 py-4">
                            {qrCodeUrl && <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 border rounded-md" />}
                            
                            <div className="w-full space-y-2">
                                <Label htmlFor="otp">Verification Code</Label>
                                <Input 
                                    id="otp" 
                                    placeholder="Enter 6-digit code" 
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setStep("idle")}>Cancel</Button>
                            <Button onClick={handleVerifyAndEnable} disabled={isPending || verificationCode.length !== 6}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify & Enable
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )}
      </CardContent>
    </Card>
  );
}