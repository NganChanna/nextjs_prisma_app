import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
	return (
		<div className="flex w-full items-center justify-center p-6 md:p-10 pt-16 sm:pt-24 pb-32">
			<div className="w-full max-w-sm md:max-w-xl">
				<LoginForm />
			</div>
		</div>
	);
}
