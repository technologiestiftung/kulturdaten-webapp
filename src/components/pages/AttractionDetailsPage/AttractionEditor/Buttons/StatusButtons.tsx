import { AdminAttraction } from "@api/client/models/AdminAttraction";
import Button from "@components/Button";
import useApiClient from "@hooks/useApiClient";
import { StatusUpdate, getAllowedStatusUpdates } from "@services/attractions";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	attraction: AdminAttraction;
	onUpdated(newStatus: StatusUpdate): void;
}

export default function StatusButtons({ attraction, onUpdated }: Props) {
	const apiClient = useApiClient();
	const t = useTranslations("Attraction-Details");
	type ButtonProps = {
		children: ReactNode;
		onClick: () => void;
	};
	const buttons = useMemo<ButtonProps[]>(() => {
		const allowedStatusUpdates = getAllowedStatusUpdates(attraction.status);
		return [
			allowedStatusUpdates.publish && {
				children: t("status-update-publish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsPublish(attraction.identifier);
					onUpdated("publish");
				},
			},
			allowedStatusUpdates.unpublish && {
				children: t("status-update-unpublish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsUnpublish(attraction.identifier);
					onUpdated("unpublish");
				},
			},
			allowedStatusUpdates.archive && {
				children: t("status-update-archive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsArchive(attraction.identifier);
					onUpdated("archive");
				},
			},
			allowedStatusUpdates.unarchive && {
				children: t("status-update-unarchive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postAttractionsUnarchive(attraction.identifier);
					onUpdated("unarchive");
				},
			},
		].filter(Boolean) as ButtonProps[];
	}, [apiClient, attraction.identifier, attraction.status, onUpdated, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
