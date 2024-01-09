import OrganizationsPage from "@components/pages/OrganizationsPage";
import { decodeAccessToken } from "@services/auth";
import { getPaginationProps } from "@services/pagination";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof OrganizationsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(
	async ({ apiClient, page, pageSize, accessToken }) => {
		const decodedAccessToken = decodeAccessToken(accessToken);

		const response = await apiClient.discoverCulturalData.getOrganizations(
			page,
			pageSize,
			undefined,
			decodedAccessToken.organizationIdentifier,
		);
		const data = response.data!;
		return {
			props: {
				organizations: data.organizations || [],
				pagination: getPaginationProps(data),
			},
		};
	},
);

export default withAuth(OrganizationsPage);
