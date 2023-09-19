import apiClient from "@api/client";
import { Organization } from "@api/client/models/Organization";
import OrganizationTable from "@components/OrganizationTable";
import Page from "@components/Page";
import withAuth from "@utils/withAuth";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: (await import(`../../../i18n/${context.locale}.json`)).default,
	},
});

const OrganizationList = () => {
	const t = useTranslations("Organizations");
	const [organizations, setOrganizations] = useState<Organization[] | undefined>(undefined);

	const fetchOrganizations = () => {
		apiClient.discoverCulturalData.getOrganizations().then((res) => {
			const organizations = res?.data?.organizations;
			setOrganizations(organizations);
		});
	};

	useEffect(() => {
		fetchOrganizations();
	}, []);

	return (
		<Page metadata={{ title: t("page-title") }}>
			{organizations ? (
				<OrganizationTable organizations={organizations} fetchOrganizations={fetchOrganizations} />
			) : (
				<div>Loading...</div>
			)}
		</Page>
	);
};

export default withAuth(OrganizationList);
