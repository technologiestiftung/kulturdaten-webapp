import apiClient from "@api/client";
import { Organization } from "@api/client/models/Organization";
import Page from "@components/Page";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import OrganizationTable from "./OrganizationTable";

export default function OrganizationsPage() {
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
}
