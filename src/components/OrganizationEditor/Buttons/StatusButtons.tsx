import { Organization } from "@api/client/models/Organization";
import Button from "@components/Button";
import useApiClient from "@hooks/useApiClient";
import { getAllowedStatusUpdates } from "@utils/organizations";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	organization: Organization;
	onUpdated(): void;
}

export default function StatusButtons({ organization, onUpdated }: Props) {
	const apiClient = useApiClient();
	const t = useTranslations("Organization-Details");
	type ButtonProps = {
		children: ReactNode;
		onClick: () => void;
	};
	const buttons = useMemo<ButtonProps[]>(() => {
		const allowedStatusUpdates = getAllowedStatusUpdates(organization.status);
		return [
			allowedStatusUpdates.publish && {
				children: t("status-update-publish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postOrganizationsPublish(organization.identifier);
					onUpdated();
				},
			},
			allowedStatusUpdates.unpublish && {
				children: t("status-update-unpublish"),
				onClick: async () => {
					await apiClient.manageCulturalData.postOrganizationsUnpublish(organization.identifier);
					onUpdated();
				},
			},
			allowedStatusUpdates.archive && {
				children: t("status-update-archive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postOrganizationsArchive(organization.identifier);
					onUpdated();
				},
			},
			allowedStatusUpdates.unarchive && {
				children: t("status-update-unarchive"),
				onClick: async () => {
					await apiClient.manageCulturalData.postOrganizationsUnarchive(organization.identifier);
					onUpdated();
				},
			},
		].filter(Boolean) as ButtonProps[];
	}, [apiClient, organization.identifier, organization.status, onUpdated, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
