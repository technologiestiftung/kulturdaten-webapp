import React, { useEffect, useState } from 'react';
import OrganizationTable from '../../components/OrganizationTable';
import PageWrapper from '../../components/PageWrapper';
import { Organization, OrganizationsService } from '../../generated-api-client';

const OrganizationList = () => {
	const [organizations, setOrganizations] = useState<Organization[] | undefined>(undefined);

	const fetchOrganizations = () => {
		OrganizationsService.getOrganizations()
			.then((res) => {
				const organizationsObject = res?.organizations;
				setOrganizations(organizationsObject || undefined);
			})
			.catch((error) => {
				console.log('Error fetching organizations:', error);
			});
	};

	useEffect(() => {
		fetchOrganizations();
		console.log('OrganizationList');
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
