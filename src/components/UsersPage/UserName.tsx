import { User } from "@api/client/models/User";
import { useTranslations } from "next-intl";

interface Props {
	user: User;
	isCurrentUser?: boolean;
}

export default function UserName({ user, isCurrentUser }: Props) {
	const t = useTranslations("Users");
	return (
		<>
			{user.firstName || "-"} {user.lastName || ""} {isCurrentUser && `(${t("table-name-current-user-indicator")})`}
		</>
	);
}
