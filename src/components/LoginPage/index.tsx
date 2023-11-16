import { ApiError } from "@api/client/core/ApiError";
import ROUTES from "@common/routes";
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

const Buttons = styled.div({
	display: "flex",
	gap: spacings.get(2),
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
	const [password, setPassword] = useState<string>("");
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>(initialErrorMessages);
	const [emailPristine, setEmailPristine] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const { logIn } = useUser();

	const onEmailChange = (value: string) => {
		const emailValid = validateEmail(value);
		setErrorMessages({ ...errorMessages, email: emailValid });
		emailSet(value);
		setEmailPristine(false);
	};

	const onPasswordChange = (value: string) => {
		setErrorMessages(initialErrorMessages);
		setPassword(value);
	};

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitting(true);
		const emailValid = validateEmail(email);
		setErrorMessages({ ...initialErrorMessages, email: emailValid || null });
		try {
			await logIn(email, password);
		} catch (error) {
			const apiError = error as ApiError;
			if (apiError?.status) {
				setErrorMessages({
					...errorMessages,
					general: `Login fehlgeschlagen, ${apiError.status}`,
				});
			} else {
				setErrorMessages({ ...errorMessages, general: "Verbindung fehlgeschlagen" });
			}
		} finally {
			setSubmitting(false);
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
						disabled={submitting}
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
						disabled={submitting}
					/>
					<Spacer size={20} />
					<Buttons>
						<Button type="submit" disabled={submitting}>
							{t("login-button")}
						</Button>
						<Button as="a" href={ROUTES.registration()} color="neutral">
							{t("register-button")}
						</Button>
					</Buttons>
					<Spacer size={15} />
					<ErrorMessage error={errorMessages.general || ""} />
				</form>
			</Content>
		</PageBackground>
	);
}
