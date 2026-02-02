import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import  prisma  from '@/lib/prisma'
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { sendOTPAction } from './actions/sendOTPAction.action';
import { sendEmailAction } from './actions/sendEmailAction.action';
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
    appName: 'SuperBlog',
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
    plugins: [
        twoFactor({
            otpOptions: {
                period: 30,
                digits: 6,
                sendOTP: async ({ user, otp }) => {
                    await sendOTPAction({
                        to: user.email,
                        otp: otp
                    });
                }
            },
        }),
    ],
    emailAndPassword: {    		requireEmailVerification: false,
    		enabled: true,
    		autoSignIn: true,
    		minPasswordLength: 6,
    		verifyEmailOnSignUp: false,
    		sendOnSignUp: false,
    		autoSignInAfterVerification: true,
    		expiresIn: 3600, // 1 hour
    		sendResetPassword: async ({ user, url }) => {			await sendEmailAction({
				to: user.email,
				subject: "Reset your password",
				meta: {
					description: "Click the link below to reset your password.",
					link: `${url}`,
				},
			});
		},
	},
    // trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
    session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	advanced: {
		cookiePrefix: "SuperBlog",
	},

	emailVerification: {
		sendOnSignUp: true,
		expiresIn: 60 * 60,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const link = new URL(url);
			link.searchParams.set("callbackURL", "/");

			await sendEmailAction({
				to: user.email,
				subject: "Verify your email address",
				meta: {
					description: "Please verify your email address to complete the registration process.",
					link: String(link),
				},
			});
		},
	},

	
	// hooks: {
	// 	before: createAuthMiddleware(async (ctx) => {
	// 		if (ctx.path !== "/sign-up/email" && ctx.path !== "/signup/email") {
	// 			return;
	// 		}
	// 		const email = ctx.body?.email;
	// 		const emailDomainConfig = process.env.EMAIL_DOMAIN;
	// 		if (email && emailDomainConfig) {
	// 			const allowedEntities = emailDomainConfig.split(",").map(d => d.trim());
	// 			const userDomain = email.split("@")[1];
	// 			const isAllowed = allowedEntities.some(entity => 
	// 				entity === userDomain || entity === email
	// 			);
	// 			if (!isAllowed) {
	// 				throw new APIError("BAD_REQUEST", {
	// 					message: "Email domain not allowed",
	// 				});
	// 			}
	// 		}
	// 	}),
	// },
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";