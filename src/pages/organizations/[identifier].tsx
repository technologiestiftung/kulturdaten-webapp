import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Organization, OrganizationsService, PatchOrganization } from '../../generated-api-client';
import PageWrapper from '../../components/PageWrapper';
import OrganizationEditor from '../../components/OrganisationEditor';

export default function OrganizationDetails() {
	const router = useRouter();
	const { identifier } = router.query;
	const [organization, organizationSet] = useState<Organization | undefined>(undefined);

	useEffect(() => {
		if (identifier && !organization) {
			try {
				OrganizationsService.getOrganizations1(identifier as string).then((res) => {
					console.log('Organization', res);
					const organizationObject = res?.organization;
					organizationSet(organizationObject || undefined);
				});
			} catch (error) {
				console.log('ERROR', error);
			}
		}
	}, [identifier, organization]);

	const editOrganization = (organization: Organization) => {
		console.log('EDIT Organization', organization);
		OrganizationsService.patchOrganizations(identifier as string, organization as PatchOrganization)
			.then(() => {
				console.log('Organization edited successfully');
				router.push(`/organizations/${identifier}`);
			})
			.catch((error) => {
				console.log('ERROR', error);
			});
	};

	if (!organization) {
		return <div>Loading...</div>;
	} else {
		return (
			<PageWrapper>
				<h1>Organisationsüberblick</h1>
				<p>Hier kannst du alle hinterlegten Infos einsehen und bearbeiten</p>
				<h2>{organization.name?.de}</h2>
				<p>{organization.description?.de}</p>
				{organization.address?.postalCode && <p>{organization.address?.postalCode}</p>}
				{organization.address?.addressLocality && <p>{organization.address?.addressLocality}</p>}
				<div className="mb-4"></div>
				<OrganizationEditor
					organization={organization}
					submitHandler={() => editOrganization(organization)}
					submitLabel="Organisation bearbeiten"
				/>
			</PageWrapper>
		);
	}
}
//TODO: how to reuse the component from create.tsx?
