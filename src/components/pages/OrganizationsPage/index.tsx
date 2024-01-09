import { Organization } from "@api/client/models/Organization";
import Page from "@components/Page";
import { useTranslations } from "use-intl";
import { PaginationType } from "@common/types";
import ROUTES from "@common/routes";
import Button from "@components/Button";
import PageTitleHeader from "@components/PageTitleHeader";
import { useRouter } from "next/router";
import Spacer from "@components/Spacer";
import ContentTable from "@components/ContentTable";
import { getLocalizedLabel } from "@services/content";
import OrganizationStatus from "@components/OrganizationStatus";
import Pagination from "@components/Pagination";

interface Props {
	organizations: Organization[];
	pagination: PaginationType;
}

export default function OrganizationsPage(props: Props) {
	const router = useRouter();
	const { organizations, pagination } = props;
	const t = useTranslations("Organizations");
	return (
		<Page metadata={{ title: t("page-title") }}>
			<PageTitleHeader
				title={t("page-title")}
				side={
					<Button as="a" useNextLink={true} href={ROUTES.organizationCreate()}>
						{t("create-organization")}
					</Button>
				}
			/>
			<Spacer size={20} />
			<ContentTable
				items={organizations}
				columns={[
					{
						header: t("table-header-title"),
						getContent: (organization) => getLocalizedLabel(organization.title!),
						canBeSorted: false,
					},
					{
						header: t("table-header-identifier"),
						getContent: (organization) => organization.identifier,
						canBeSorted: false,
					},
					{
						header: t("table-header-status"),
						getContent: (organization) => <OrganizationStatus status={organization.status} />,
						canBeSorted: false,
					},
				]}
				onClickItem={(organization) => router.push(ROUTES.organizationDetails(organization.identifier))}
			/>
			<Spacer size={20} />
			<Pagination pagination={pagination} info={t("number-organizations", { count: pagination.totalCount })} />
		</Page>
	);
}
