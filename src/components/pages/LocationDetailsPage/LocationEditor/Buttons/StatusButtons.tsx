import { Location } from "@api/client/models/Location";
import Button from "@components/Button";
import useApiClient from "@hooks/useApiClient";
import { StatusUpdate, getAllowedStatusUpdates } from "@services/locations";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	location: Location;
	onUpdated(newStatus: StatusUpdate): void;
}

export default function StatusButtons({ location, onUpdated }: Props) {
	const apiClient = useApiClient();
	const t = useTranslations("Location-Details");
	type ButtonProps = {
		children: ReactNode;
		onClick: () => void;
	};
	const buttons = useMemo<ButtonProps[]>(() => {
		const allowedStatusUpdates = getAllowedStatusUpdates(location.status);
		return [
			allowedStatusUpdates.publish && {
				children: t("status-update-publish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsPublish(location.identifier);
					onUpdated("publish");
				},
			},
			allowedStatusUpdates.unpublish && {
				children: t("status-update-unpublish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsUnpublish(location.identifier);
					onUpdated("unpublish");
				},
			},
			allowedStatusUpdates.archive && {
				children: t("status-update-archive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsArchive(location.identifier);
					onUpdated("archive");
				},
			},
			allowedStatusUpdates.unarchive && {
				children: t("status-update-unarchive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsUnarchive(location.identifier);
					onUpdated("unarchive");
				},
			},
		].filter(Boolean) as ButtonProps[];
	}, [apiClient, location.identifier, location.status, onUpdated, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
