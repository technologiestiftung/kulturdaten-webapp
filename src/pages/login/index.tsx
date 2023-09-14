import apiClient from "@api/client";
import { ApiError } from "@api/client/core/ApiError";
import { Button } from "@components/Button";
import { Input } from "@components/InputField";
import PageWrapper from "@components/PageWrapper";
import { validateEmail } from "@utils/validation";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { setCookie } from "typescript-cookie";
import FormWrapper from "../../components/FormWrapper";
import { UserContext } from "../../contexts/userContext";

interface ErrorMessages {
	general: string | undefined;
	email: string | undefined;
}

const initialErrorMessages: ErrorMessages = {
	general: undefined,
	email: undefined,
};

const LoginPage: FC = () => {
	const [email, emailSet] = useState<string>("");
	const [password, passwordSet] = useState<string>("");
	const [errorMessages, errorMessagesSet] = useState<ErrorMessages>(initialErrorMessages);
	const [emailPristine, emailPristineSet] = useState<boolean>(true);

	const router = useRouter();
	const { saveAuthObject } = React.useContext(UserContext);

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
			const loginResponse = await apiClient.authentication.postAuthenticationLogin({
				email: email.toLowerCase(),
				password,
			});
			const loginResponseData = loginResponse.data;
			if (loginResponseData?.accessToken) {
				setCookie("accessToken", loginResponseData.accessToken, {
					// TODO: Calculate expiry date via loginResponseData.expiresIn.
					// expires: loginResponseData.expiresIn ? new Date(loginResponseData.expiresIn) : undefined,
					path: "/",
				});
				saveAuthObject(loginResponseData);
				router.push("/");
			}
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
		<PageWrapper>
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
		</PageWrapper>
	);
};

export default LoginPage;
