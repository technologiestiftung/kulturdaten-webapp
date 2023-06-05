import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Organization, OrganizationsService } from '../../generated-api-client';
import PageWrapper from '../../components/PageWrapper';

export default function OrganizationDetails() {
	const router = useRouter();
	const { identifier } = router.query;
	const [organization, setOrganization] = useState<Organization | undefined>(undefined);

	useEffect(() => {
		if (identifier && !organization) {
			try {
				OrganizationsService.getOrganizations1(identifier as string).then((res) => {
					console.log('ORGANISATION', res);
					const organisationObject = res?.organization;
					setOrganization(organisationObject || undefined);
				});
			} catch (error) {
				console.log('ERROR', error);
			}
		}
	}, [identifier, organization]);

	if (!organization) {
		return <div>Loading...</div>;
	} else {
		return (
			<PageWrapper>
				<h1>{organization.name?.de}</h1>
				<p>{organization.description?.de}</p>
				{organization.address?.postalCode && <p>{organization.address?.postalCode}</p>}
				{organization.address?.addressLocality && <p>{organization.address?.addressLocality}</p>}
			</PageWrapper>
		);
	}
}
