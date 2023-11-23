import ErrorMessage from "@components/ErrorMessage";
import { useTranslations } from "next-intl";

type KnownErrorMessage = "User is already a member" | "User not exist";

interface Props {
	error: KnownErrorMessage | string | null;
}

export default function Error(props: Props) {
	const { error } = props;
	const t = useTranslations("User-Details");
	const errorTranslations: Record<KnownErrorMessage | string, string> = {
		"User is already a member": t("error-user-is-already-a-member"),
		"User not exist": t("error-user-not-exist"),
	};
	return <ErrorMessage error={error ? errorTranslations[error] || t("error-unknown") : null} />;
}
