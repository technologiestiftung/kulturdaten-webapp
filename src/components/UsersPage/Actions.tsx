import { User } from "@api/client/models/User";
import useApiClient from "@hooks/useApiClient";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PopoverMenu, { MenuOption } from "../PopoverMenu";

interface Props {
	user: User;
	onUpdated(): void;
}

export default function Actions({ user, onUpdated }: Props) {
	const apiClient = useApiClient();
	const t = useTranslations("Users");
	const options = useMemo<MenuOption[]>(() => {
		return [
			{
				label: t("table-option-delete"),
				onClick: async () => {
					// TODO: Replace this with the api route to remove user’s membership.
					await apiClient.users.deleteUsers(user.identifier);
					onUpdated();
				},
			},
		].filter(Boolean) as MenuOption[];
	}, [apiClient, onUpdated, t, user.identifier]);
	return <PopoverMenu options={options} />;
}
