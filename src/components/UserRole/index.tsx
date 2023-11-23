import { Role } from "@contexts/UserContext";
import { useTranslations } from "next-intl";

interface Props {
	role: Role;
}

export default function UserRole(props: Props) {
	const t = useTranslations("Users");
	const labels: Record<Role, string> = {
		admin: t("role-admin"),
		editor: t("role-editor"),
		author: t("role-author"),
		member: t("role-member"),
		unassigned: t("role-unassigned"),
	};
	return <>{labels[props.role]}</>;
}
