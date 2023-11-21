import { Organization } from "@api/client/models/Organization";
import OrganizationDetailsPage from "@components/OrganizationDetailsPage";
import { withApiClientAndPagination } from "@utils/data";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	organization: Organization;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, messages }) => {
		const identifier = context.query.identifier as string;
		const response = await apiClient.discoverCulturalData.getOrganizations1(identifier);
		const organization = response.data!.organization!;
		return {
			props: {
				organization,
				messages,
			},
		};
	});

export default withAuth(OrganizationDetailsPage);
