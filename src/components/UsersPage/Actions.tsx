import { User } from "@api/client/models/User";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PopoverMenu, { MenuOption } from "../PopoverMenu";

interface Props {
	user: User;
	onEdit(user: User): void;
	onDelete(user: User): void;
}

export default function Actions({ user, onEdit, onDelete }: Props) {
	const t = useTranslations("Users");
	const options = useMemo<MenuOption[]>(() => {
		return [
			{
				label: t("table-option-edit"),
				onClick: () => onEdit(user),
			},
			{
				label: t("table-option-delete"),
				onClick: async () => onDelete(user),
			},
		].filter(Boolean) as MenuOption[];
	}, [user, onEdit, onDelete, t]);
	return <PopoverMenu options={options} />;
}
