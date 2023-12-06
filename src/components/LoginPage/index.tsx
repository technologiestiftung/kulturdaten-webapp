import { ApiError } from "@api/client/core/ApiError";
import ROUTES from "@common/routes";
import {
	borderRadiuses,
	boxShadows,
	colors,
	fontSizes,
	lineHeights,
	mediaQueries,
	spacings,
} from "@common/styleVariables";
import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import FormField from "@components/FormField";
import Input from "@components/Input";
import Head from "@components/Page/Head";
import Spacer from "@components/Spacer";
import styled from "@emotion/styled";
import useUser from "@hooks/useUser";
import { validateEmail } from "@services/validation";
import { FormEvent, useState } from "react";
import { useTranslations } from "use-intl";

const PageBackground = styled.div({
	backgroundColor: colors.blueDark,
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: spacings.get(2),
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

const Header = styled.h1({
	fontSize: fontSizes.large,
	lineHeight: lineHeights.headline,
});

const Buttons = styled.div({
	display: "flex",
	gap: spacings.get(2),
});

interface ErrorMessages {
	general: string | null;
	email: string | null;
}

const emptyErrorMessages: ErrorMessages = {
	general: null,
	email: null,
};

interface Props {
	initialErrorMessage?: string | null;
}

export default function LoginPage({ initialErrorMessage }: Props) {
	const t = useTranslations("Login");
	const initialErrorMessages: ErrorMessages = {
		general: initialErrorMessage ? t("error-initial", { errorMessage: initialErrorMessage }) : null,
		email: null,
	};
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
		setErrorMessages(emptyErrorMessages);
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
			setErrorMessages({
				...errorMessages,
				general: apiError?.status ? t("error-with-code", { code: apiError.status }) : t("error-generic"),
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<PageBackground>
			<Head metadata={{ title: t("page-title") }} />
			<Content>
				<Header>{t("page-header")}</Header>
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
					{errorMessages.general && <Spacer size={15} />}
					<ErrorMessage error={errorMessages.general || ""} />
				</form>
			</Content>
		</PageBackground>
	);
}
