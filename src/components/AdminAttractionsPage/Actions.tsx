import { AdminAttraction } from "@api/client/models/AdminAttraction";
import ROUTES from "@common/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useMemo } from "react";
import PopoverMenu from "../PopoverMenu";

interface Props {
	attraction: AdminAttraction;
}

export default function Actions({ attraction }: Props) {
	const router = useRouter();
	const t = useTranslations("Attractions");
	const options = useMemo(
		() => [
			{
				label: t("table-option-edit"),
				onClick: () => router.push(ROUTES.admin.attractionDetails(attraction.identifier)),
			},
			// {
			// 	label: t("table-option-delete"),
			// 	onClick: () => {},
			// },
		],
		[attraction.identifier, router, t],
	);
	return <PopoverMenu options={options} />;
}
