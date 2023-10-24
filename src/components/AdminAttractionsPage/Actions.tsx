import { AdminAttraction } from "@api/client/models/AdminAttraction";
import ROUTES from "@common/routes";
import useApiClient from "@hooks/useApiClient";
import { getAllowedStatusUpdates } from "@utils/attractions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useMemo } from "react";
import PopoverMenu, { MenuOption } from "../PopoverMenu";

interface Props {
	attraction: AdminAttraction;
	onUpdated(): void;
}

export default function Actions({ attraction, onUpdated }: Props) {
	const router = useRouter();
	const apiClient = useApiClient();
	const t = useTranslations("Attractions");
	const options = useMemo<MenuOption[]>(() => {
		const allowedStatusUpdates = getAllowedStatusUpdates(attraction.status);
		return [
			{
				label: t("table-option-edit"),
				onClick: () => router.push(ROUTES.admin.attractionDetails(attraction.identifier)),
			},
			allowedStatusUpdates.archive && {
				label: t("table-option-archive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsArchive(attraction.identifier);
					onUpdated();
					// TODO: Show success message.
				},
			},
			allowedStatusUpdates.unarchive && {
				label: t("table-option-unarchive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsUnarchive(attraction.identifier);
					onUpdated();
					// TODO: Show success message.
				},
			},
			allowedStatusUpdates.publish && {
				label: t("table-option-publish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsPublish(attraction.identifier);
					onUpdated();
					// TODO: Show success message.
				},
			},
			allowedStatusUpdates.unpublish && {
				label: t("table-option-unpublish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsUnpublish(attraction.identifier);
					onUpdated();
					// TODO: Show success message.
				},
			},
		].filter(Boolean) as MenuOption[];
	}, [apiClient, attraction.identifier, attraction.status, onUpdated, router, t]);
	return <PopoverMenu options={options} />;
}
