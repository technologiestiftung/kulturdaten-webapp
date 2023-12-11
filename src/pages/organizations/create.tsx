import OrganizationDetailsPage from "@components/pages/OrganizationDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof OrganizationDetailsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ apiClient }) => {
	const tagsResponse = await apiClient.discoverCulturalData.getTagsOrganizations();
	return {
		props: {
			organization: null,
			tags: tagsResponse.data!.tags!,
		},
	};
});

export default withAuth(OrganizationDetailsPage);
