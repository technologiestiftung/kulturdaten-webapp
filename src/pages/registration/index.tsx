import apiClient from "@api/client";
import { ApiError } from "@api/client/core/ApiError";
import { CreateUserRequest } from "@api/client/models/CreateUserRequest";
import { Button } from "@components/Button";
import FormWrapper from "@components/FormWrapper";
import { Input } from "@components/InputField";
import Page from "@components/Page";
import { validateEmail, validatePassword, validateRepeatPassword } from "@utils/validation";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useEffect } from "react";
import { useTranslations } from "use-intl";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: (await import(`../../../i18n/${context.locale}.json`)).default,
	},
});

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

interface ErrorMessages {
	email: string | undefined;
	mainPassword: string | undefined;
	repeatPassword: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	email: undefined,
	mainPassword: undefined,
	repeatPassword: undefined,
	general: undefined,
};

const Registration: FC = () => {
	const t = useTranslations("Registration");
	const router = useRouter();

	const [email, emailSet] = React.useState<string>("");
	const [mainPassword, mainPasswordSet] = React.useState<string>("");
	const [, repeatPasswordSet] = React.useState<string>("");
	const [emailPristine, emailPristineSet] = React.useState<boolean>(true);
	const [mainPasswordPristine, mainPasswordPristineSet] = React.useState<boolean>(true);
	const [repeatPasswordPristine, repeatPasswordPristineSet] = React.useState<boolean>(true);
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);

	const [formValid, formValidSet] = React.useState<boolean>(false);

	useEffect(() => {
		if (
			!emailPristine &&
			!mainPasswordPristine &&
			!repeatPasswordPristine &&
			Object.values(errorMessages)
				//exclude the general error from the check
				.filter((error) => error !== errorMessages.general)
				.reduce((acc, curr) => acc + curr, "").length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [errorMessages, emailPristine, mainPasswordPristine, repeatPasswordPristine]);

	const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValid) {
			const body: CreateUserRequest = {
				email: email.toLowerCase(),
				password: mainPassword,
				firstName: "Kommissar",
				lastName: "Zufall",
			};

			try {
				await apiClient.users.postUsers(body);
				errorMessagesSet(initialerrorMessages);
				router.push("/");
			} catch (error) {
				const apiError = error as ApiError;
				if (apiError.status) {
					switch (apiError.status) {
						case 409:
							errorMessagesSet({
								...errorMessages,
								general: `Email bereits vergeben ${apiError.status}`,
							});
							break;
						default:
							errorMessagesSet({
								...errorMessages,
								general: `Unbekannter Fehler ${apiError.status}`,
							});
					}
				} else {
					errorMessagesSet({
						...errorMessages,
						general: `Verbindung fehlgeschlagen ${apiError.status}`,
					});
				}
			}
		} else if (emailPristine || mainPasswordPristine || repeatPasswordPristine) {
			errorMessagesSet({ ...errorMessages, general: "Mindestens ein Feld ist noch leer" });
		} else {
		}
	};

	const onChange = (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		switch (id) {
			case "email":
				const emailValid = validateEmail(value);
				errorMessagesSet({ ...errorMessages, email: emailValid, general: undefined });
				emailSet(value);
				break;
			case "mainPassword":
				const mainPasswordValid = validatePassword(value);
				let repeatPasswordValid = validateRepeatPassword(value, mainPassword);
				errorMessagesSet({
					...errorMessages,
					mainPassword: mainPasswordValid,
					repeatPassword: repeatPasswordValid,
					general: undefined,
				});
				mainPasswordSet(value);
				break;
			case "repeatPassword":
				repeatPasswordValid = validateRepeatPassword(value, mainPassword);
				errorMessagesSet({
					...errorMessages,
					repeatPassword: repeatPasswordValid,
					general: undefined,
				});
				repeatPasswordSet(value);
				break;
			default:
		}
	};

	return (
		<Page metadata={{ title: t("page-title") }} showNavigation={false}>
			<FormWrapper>
				<h1>Registriere dich jetzt!</h1>
				<p className="mt-2 mb-8">
					kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!
				</p>
				<form onSubmit={(e) => handleRegistration(e)}>
					<Input
						type="email"
						id="email"
						label={"Email"}
						required
						placeholder={"Hier bitte Email eingeben … "}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={emailPristineSet}
						errorMessage={emailPristine ? undefined : errorMessages.email}
					/>
					<Input
						type="password"
						id="mainPassword"
						label={"Password"}
						required
						placeholder={"Hier bitte Passwort eingeben … "}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={mainPasswordPristineSet}
						errorMessage={mainPasswordPristine ? undefined : errorMessages.mainPassword}
					/>
					<Input
						type="password"
						id="repeatPassword"
						label={"Passwort bestätigen"}
						required
						placeholder={"Hier bitte Passwort eingeben … "}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={repeatPasswordPristineSet}
						errorMessage={repeatPasswordPristine ? undefined : errorMessages.repeatPassword}
					/>
					<Button label="Registrieren" type="submit" />
				</form>
				{errorMessages.general && <span aria-live="assertive">{errorMessages.general}</span>}
			</FormWrapper>
		</Page>
	);
};

export default Registration;
