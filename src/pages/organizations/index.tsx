import { useEffect, useState } from "react";
import apiClient from "../../api/client";
import { Organization } from "../../api/client/models/Organization";
import OrganizationTable from "../../components/OrganizationTable";
import PageWrapper from "../../components/PageWrapper";

const OrganizationList = () => {
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
		<PageWrapper>
			<div className="w-full"></div>
			{organizations ? (
				<OrganizationTable organizations={organizations} fetchOrganizations={fetchOrganizations} />
			) : (
				<div>Loading...</div>
			)}
		</PageWrapper>
	);
};

export default OrganizationList;
