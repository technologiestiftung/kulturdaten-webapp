import OrganizationDetailsPage from "@components/pages/OrganizationDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof OrganizationDetailsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ context, apiClient }) => {
	const identifier = context.query.identifier as string;
	const organizationResponse = await apiClient.discoverCulturalData.getOrganizations1(identifier);
	const tagsResponse = await apiClient.discoverCulturalData.getTagsOrganizations();
	return {
		props: {
			organization: organizationResponse.data!.organization!,
			tags: tagsResponse.data!.tags!,
		},
	};
});

export default withAuth(OrganizationDetailsPage);
