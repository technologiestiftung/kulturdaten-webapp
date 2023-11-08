import ErrorMessage from "@components/ErrorMessage";
import { useTranslations } from "next-intl";

type KnownErrorMessage = "Not found";

interface Props {
	error: KnownErrorMessage | string | null;
}

export default function Error(props: Props) {
	const { error } = props;
	const t = useTranslations("User-Details");
	const errorTranslations: Record<KnownErrorMessage | string, string> = {
		"Not found": t("error-user-not-found"),
	};
	return <ErrorMessage error={error ? errorTranslations[error] || t("error-unknown") : null} />;
}
