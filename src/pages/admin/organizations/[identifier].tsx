import apiClient from "@api/client";
import { Organization } from "@api/client/models/Organization";
import { UpdateOrganizationRequest } from "@api/client/models/UpdateOrganizationRequest";
import FormWrapper from "@components/FormWrapper";
import OrganizationEditor from "@components/OrganisationEditor";
import Page from "@components/Page";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

export const getServerSideProps: GetServerSideProps = async (context) => ({
	props: {
		messages: (await import(`../../../../i18n/${context.locale}.json`)).default,
	},
});

const OrganizationDetails = () => {
	const t = useTranslations("Organizations");
	const router = useRouter();
	const [organization, organizationSet] = useState<Organization | null>(null);
	const { identifier } = router.query;

	const fetchOrganization = useCallback(async () => {
		if (identifier) {
			const res = await apiClient.discoverCulturalData.getOrganizations1(identifier as string);
			const organizationObject = res?.data?.organization;
			organizationSet(organizationObject || null);
		}
	}, [identifier]);

	useEffect(() => {
		if (identifier !== undefined) {
			fetchOrganization();
		}
	}, [identifier, fetchOrganization]);

	const editOrganization = (organizationObject: Organization) => {
		apiClient.maintainCulturalData
			.patchOrganizations(identifier as string, organizationObject as UpdateOrganizationRequest)
			.then(() => {
				fetchOrganization();
				router.push(`/admin/organizations/${identifier}`);
			});
	};

	if (organization === null) {
		return <div>Loading...</div>;
	} else {
		return (
			<Page metadata={{ title: t("edit-organization") }}>
				<FormWrapper>
					<h1>Organisationsüberblick</h1>
					<p>Hier kannst du alle hinterlegten Infos einsehen und bearbeiten</p>
					<h2>{organization.title?.de}</h2>
					<p>{organization.description?.de}</p>
					{organization.address?.postalCode && <p>{organization.address?.postalCode}</p>}
					{organization.address?.addressLocality && <p>{organization.address?.addressLocality}</p>}
					<div className="mb-4"></div>
					<OrganizationEditor
						organization={organization}
						submitHandler={(e, organizationObject) => editOrganization(organizationObject as Organization)}
						submitLabel="Organisation bearbeiten"
					/>
				</FormWrapper>
			</Page>
		);
	}
};
export default withAuth(OrganizationDetails);
