import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Organization, OrganizationsService, PatchOrganization } from '../../generated-api-client';
import PageWrapper from '../../components/PageWrapper';
import OrganizationEditor from '../../components/OrganisationEditor';
import withAuth from '../../utils/withAuth';

const OrganizationDetails = () => {
	const router = useRouter();
	const [organization, organizationSet] = useState<Organization | null>(null);
	const { identifier } = router.query;

	const fetchOrganization = async () => {
		if (identifier) {
			try {
				const res = await OrganizationsService.getOrganizations1(identifier as string);
				const organizationObject = res?.organization;
				organizationSet(organizationObject || null);
			} catch (error) {
				console.log('ERROR', error);
			}
		}
	};

	useEffect(() => {
		if (identifier !== undefined) {
			fetchOrganization();
		}
	}, [identifier]);

	const editOrganization = (
		e: React.FormEvent<HTMLFormElement>,
		organizationObject: Organization
	) => {
		console.log('EDIT Organization', organizationObject);
		OrganizationsService.patchOrganizations(
			identifier as string,
			organizationObject as PatchOrganization
		)
			.then(() => {
				console.log('Organization edited successfully');
				fetchOrganization();
				router.push(`/organizations/${identifier}`);
			})
			.catch((error) => {
				console.log('ERROR', error);
			});
	};

	if (organization === null) {
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
					submitHandler={(e, organizationObject) =>
						editOrganization(e, organizationObject as Organization)
					}
					submitLabel="Organisation bearbeiten"
				/>
			</PageWrapper>
		);
	}
};
export default withAuth(OrganizationDetails);
