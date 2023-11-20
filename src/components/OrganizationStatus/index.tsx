import { Organization } from "@api/client/models/Organization";
import { useTranslations } from "next-intl";

type Status = Organization["status"];

const i18nKeys: Record<Status, keyof IntlMessages["Organizations"]> = {
	"organization.published": "status-published",
	"organization.unpublished": "status-unpublished",
	"organization.archived": "status-archived",
};

interface Props {
	status: Status;
}

export default function OrganizationStatus({ status }: Props) {
	const t = useTranslations("Organizations");
	return <>{t(i18nKeys[status])}</>;
}
