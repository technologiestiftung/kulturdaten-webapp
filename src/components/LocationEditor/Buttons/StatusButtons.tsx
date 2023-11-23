import { Location } from "@api/client/models/Location";
import useApiClient from "@hooks/useApiClient";
import { getAllowedStatusUpdates } from "@services/locations";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";
import Button from "../../Button";

interface Props {
	location: Location;
	onUpdated(): void;
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
					onUpdated();
				},
			},
			allowedStatusUpdates.unpublish && {
				children: t("status-update-unpublish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsUnpublish(location.identifier);
					onUpdated();
				},
			},
			allowedStatusUpdates.archive && {
				children: t("status-update-archive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsArchive(location.identifier);
					onUpdated();
				},
			},
			allowedStatusUpdates.unarchive && {
				children: t("status-update-unarchive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postLocationsUnarchive(location.identifier);
					onUpdated();
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
