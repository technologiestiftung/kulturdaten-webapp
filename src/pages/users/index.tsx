import UsersPage from "@components/pages/UsersPage";
import { decodeAccessToken } from "@services/auth";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof UsersPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ apiClient, accessToken, messages }) => {
	const decodedAccessToken = decodeAccessToken(accessToken);
	const response = await apiClient.manageYourOrganizationData.getOrganizationsMemberships(
		decodedAccessToken.organizationIdentifier,
	);
	const data = response.data!;
	return {
		props: {
			memberships: data.memberships || [],
			messages,
		},
	};
});

export default withAuth(UsersPage);
