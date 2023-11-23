import { Organization } from "@api/client/models/Organization";
import { Tag } from "@common/types";
import OrganizationDetailsPage from "@components/pages/OrganizationDetailsPage";
import { withApiClientAndPagination } from "@services/data";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	organization: Organization;
	tags: Tag[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, messages }) => {
		const identifier = context.query.identifier as string;
		const organizationResponse = await apiClient.discoverCulturalData.getOrganizations1(identifier);
		const tagsResponse = await apiClient.discoverCulturalData.getTagsOrganizations();
		return {
			props: {
				organization: organizationResponse.data!.organization!,
				tags: tagsResponse.data!.tags!,
				messages,
			},
		};
	});

export default withAuth(OrganizationDetailsPage);
