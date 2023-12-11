import { Organization } from "@api/client/models/Organization";
import Button from "@components/Button";
import { StatusUpdate, getAllowedStatusUpdates } from "@services/organizations";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	organization: Organization;
	onUpdate(newStatus: StatusUpdate): void;
}

export default function StatusButtons({ organization, onUpdate }: Props) {
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
				onClick: () => onUpdate("publish"),
			},
			allowedStatusUpdates.unpublish && {
				children: t("status-update-unpublish"),
				onClick: () => onUpdate("unpublish"),
			},
			allowedStatusUpdates.archive && {
				children: t("status-update-archive"),
				onClick: () => onUpdate("archive"),
			},
			allowedStatusUpdates.unarchive && {
				children: t("status-update-unarchive"),
				onClick: () => onUpdate("unarchive"),
			},
		].filter(Boolean) as ButtonProps[];
	}, [organization.status, onUpdate, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
