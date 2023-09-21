import { ApiError } from "@api/client/core/ApiError";
import { Button } from "@components/Button";
import FormWrapper from "@components/FormWrapper";
import { Input } from "@components/InputField";
import Page from "@components/Page";
import useUser from "@hooks/useUser";
import { loadMessages } from "@utils/i18n";
import { validateEmail } from "@utils/validation";
import { GetStaticProps } from "next";
import React, { FC, useState } from "react";
import { useTranslations } from "use-intl";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

interface ErrorMessages {
	general: string | undefined;
	email: string | undefined;
}

const initialErrorMessages: ErrorMessages = {
	general: undefined,
	email: undefined,
};

const LoginPage: FC = () => {
	const t = useTranslations("Login");
	const [email, emailSet] = useState<string>("");
	const [password, passwordSet] = useState<string>("");
	const [errorMessages, errorMessagesSet] = useState<ErrorMessages>(initialErrorMessages);
	const [emailPristine, emailPristineSet] = useState<boolean>(true);
	const { logIn } = useUser();

	const onEmailChange = (value: string) => {
		const emailValid = validateEmail(value);
		errorMessagesSet({ ...errorMessages, email: emailValid });
		emailSet(value);
	};

	const onPasswordChange = (value: string) => {
		errorMessagesSet(initialErrorMessages);
		passwordSet(value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailValid = validateEmail(email);
		errorMessagesSet({ ...initialErrorMessages, email: emailValid ? emailValid : undefined });
		try {
			await logIn(email, password);
		} catch (error) {
			const apiError = error as ApiError;
			if (apiError?.status) {
				errorMessagesSet({
					...errorMessages,
					general: `Login fehlgeschlagen, ${apiError.status}`,
				});
			} else {
				errorMessagesSet({ ...errorMessages, general: "Verbindung fehlgeschlagen" });
			}
		}
	};

	return (
		<Page metadata={{ title: t("page-title") }} showNavigation={false}>
			<FormWrapper>
				<h1>Bei kulturdaten.berlin einloggen</h1>
				<p className="mt-2 mb-8">
					kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!
				</p>
				<form onSubmit={handleLogin}>
					<Input
						type="email"
						id="email"
						label={"Email"}
						required
						placeholder={"Hier bitte Email eingeben … "}
						errorMessage={emailPristine ? undefined : errorMessages.email}
						onChange={(value) => onEmailChange(value)}
						setPristine={emailPristineSet}
					/>
					<Input
						type="password"
						id="password"
						label={"Password"}
						required
						placeholder={"Hier bitte Passwort eingeben … "}
						onChange={(value) => onPasswordChange(value)}
					/>
					<Button type="submit" label="Login" />
				</form>
				{errorMessages.general && <p aria-live="assertive">{errorMessages.general}</p>}
			</FormWrapper>
		</Page>
	);
};

export default LoginPage;
