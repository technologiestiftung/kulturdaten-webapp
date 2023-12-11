import { AdminAttraction } from "@api/client/models/AdminAttraction";
import Button from "@components/Button";
import { StatusUpdate, getAllowedStatusUpdates } from "@services/attractions";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	attraction: AdminAttraction;
	onUpdate(newStatus: StatusUpdate): void;
}

export default function StatusButtons({ attraction, onUpdate }: Props) {
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
	}, [attraction.status, onUpdate, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
