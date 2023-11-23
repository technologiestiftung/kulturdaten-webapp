import { Membership } from "@common/types";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PopoverMenu, { MenuOption } from "../../PopoverMenu";

interface Props {
	membership: Membership;
	onEdit(membership: Membership): void;
	onDelete(membership: Membership): void;
}

export default function Actions({ membership, onEdit, onDelete }: Props) {
	const t = useTranslations("Users");
	const options = useMemo<MenuOption[]>(() => {
		return [
			{
				label: t("table-option-edit"),
				onClick: () => onEdit(membership),
			},
			{
				label: t("table-option-delete"),
				onClick: async () => onDelete(membership),
			},
		].filter(Boolean) as MenuOption[];
	}, [membership, onEdit, onDelete, t]);
	return <PopoverMenu options={options} />;
}
