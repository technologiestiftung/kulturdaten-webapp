import { ApiError } from "@api/client/core/ApiError";
import { borderRadiuses, boxShadows, colors, mediaQueries, spacings } from "@common/styleVariables";
import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import FormField from "@components/FormField";
import Input from "@components/Input";
import Head from "@components/Page/Head";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import useUser from "@hooks/useUser";
import { validateEmail } from "@utils/validation";
import { FormEvent, useState } from "react";
import { useTranslations } from "use-intl";

const PageBackground = styled.div({
	backgroundColor: colors.blueDark,
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "flex-start",
	padding: spacings.get(1),
	[mediaQueries.m]: {
		alignItems: "center",
	},
});

const Content = styled.main({
	maxWidth: "600px",
	backgroundColor: colors.white,
	borderRadius: borderRadiuses.big,
	boxShadow: boxShadows.elevation100,
	padding: `${spacings.get(4)} ${spacings.get(3)}`,
	[mediaQueries.s]: {
		padding: spacings.get(4),
	},
});

interface ErrorMessages {
	general: string | null;
	email: string | null;
}

const initialErrorMessages: ErrorMessages = {
	general: null,
	email: null,
};

export default function LoginPage() {
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
		emailPristineSet(false);
	};

	const onPasswordChange = (value: string) => {
		errorMessagesSet(initialErrorMessages);
		passwordSet(value);
	};

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const emailValid = validateEmail(email);
		errorMessagesSet({ ...initialErrorMessages, email: emailValid || null });
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
		<PageBackground>
			<Head metadata={{ title: t("page-title") }} />
			<Content>
				<h1>{t("page-header")}</h1>
				<Spacer size={10} />
				<p>{t("page-description")}</p>
				<Spacer size={15} />
				<form onSubmit={handleLogin}>
					<FormField
						component={Input}
						type="email"
						autoComplete="email"
						label={t("label-email")}
						id="email"
						value={email}
						onChange={(event) => onEmailChange(event.target.value)}
						required={true}
						error={!emailPristine ? errorMessages.email : null}
					/>
					<Spacer size={15} />
					<FormField
						component={Input}
						type="password"
						autoComplete="password"
						label={t("label-password")}
						id="password"
						value={password}
						onChange={(event) => onPasswordChange(event.target.value)}
						required={true}
					/>
					<Spacer size={20} />
					<Button type="submit">{t("login-button")}</Button>
				</form>
				<ErrorMessage error={errorMessages.general || ""} />
			</Content>
		</PageBackground>
	);
}
