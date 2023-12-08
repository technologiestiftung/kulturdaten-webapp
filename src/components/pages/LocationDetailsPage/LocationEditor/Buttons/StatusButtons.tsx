import { Location } from "@api/client/models/Location";
import Button from "@components/Button";
import { StatusUpdate, getAllowedStatusUpdates } from "@services/locations";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

interface Props {
	location: Location;
	onUpdate(newStatus: StatusUpdate): void;
}

export default function StatusButtons({ location, onUpdate }: Props) {
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
	}, [location.status, onUpdate, t]);
	return (
		<>
			{buttons.map((props, index) => (
				<Button key={index} color="neutral" {...props} />
			))}
		</>
	);
}
