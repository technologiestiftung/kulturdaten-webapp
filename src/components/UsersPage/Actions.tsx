import { User } from "@api/client/models/User";
import useApiClient from "@hooks/useApiClient";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PopoverMenu, { MenuOption } from "../PopoverMenu";

interface Props {
	user: User;
	onEdit(user: User): void;
	onUpdated(): void;
}

export default function Actions({ user, onEdit, onUpdated }: Props) {
	const apiClient = useApiClient();
	const t = useTranslations("Users");
	const options = useMemo<MenuOption[]>(() => {
		return [
			{
				label: t("table-option-edit"),
				onClick: () => onEdit(user),
			},
			{
				label: t("table-option-delete"),
				onClick: async () => {
					// TODO: Replace this with the api route to remove user’s membership.
					await apiClient.users.deleteUsers(user.identifier);
					onUpdated();
				},
			},
		].filter(Boolean) as MenuOption[];
	}, [apiClient, user, onEdit, onUpdated, t]);
	return <PopoverMenu options={options} />;
}
