import { Organization } from "@api/client/models/Organization";
import ROUTES from "@common/routes";
import OrganizationEditor from "@components/OrganizationEditor";
import OrganizationStatus from "@components/OrganizationStatus";
import Page from "@components/Page";
import PageTitle from "@components/PageTitle";
import Spacer from "@components/Spacer";
import { getLocalizedLabel } from "@utils/content";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslations } from "use-intl";

interface Props {
	organization: Organization | null;
}

export default function OrganizationDetailsPage(props: Props) {
	const { organization } = props;
	const router = useRouter();
	const t = useTranslations("Organization-Details");
	const isNew = organization === null;
	const pageTitle = isNew
		? t("page-title-add")
		: t("page-title-edit", { organizationTitle: getLocalizedLabel(organization!.title) });
	const handleAfterSubmit = useCallback(() => {
		router.push(ROUTES.admin.organizations());
	}, [router]);
	return (
		<Page metadata={{ title: pageTitle }}>
			<PageTitle>{pageTitle}</PageTitle>
			{organization && <OrganizationStatus status={organization.status} />}
			<Spacer size={20} />
			<OrganizationEditor organization={organization} onAfterSubmit={handleAfterSubmit} />
		</Page>
	);
}