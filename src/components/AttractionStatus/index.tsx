import { Attraction } from "@api/client/models/Attraction";
import { useTranslations } from "next-intl";

type Status = Attraction["status"];

const i18nKeys: Record<Status, keyof IntlMessages["Attractions"]> = {
	"attraction.published": "status-published",
	"attraction.unpublished": "status-unpublished",
	"attraction.archived": "status-archived",
};

interface Props {
	status: Status;
}

export default function AttractionStatus({ status }: Props) {
	const t = useTranslations("Attractions");
	return <>{t(i18nKeys[status])}</>;
}
