import { Location } from "@api/client/models/Location";
import { useTranslations } from "next-intl";

type Status = Location["status"];

const i18nKeys: Record<Status, keyof IntlMessages["Locations"]> = {
	"location.published": "status-published",
	"location.unpublished": "status-unpublished",
	"location.archived": "status-archived",
};

interface Props {
	status: Status;
}

export default function LocationStatus({ status }: Props) {
	const t = useTranslations("Locations");
	return <>{t(i18nKeys[status])}</>;
}
