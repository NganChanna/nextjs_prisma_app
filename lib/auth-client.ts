import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/plugins"

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  twoFactor,
} = createAuthClient({
  plugins: [
    twoFactorClient()
  ]
}) as any;
