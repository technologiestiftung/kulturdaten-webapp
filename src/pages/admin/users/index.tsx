import { Membership } from "@common/types";
import UsersPage from "@components/pages/UsersPage";
import { decodeAccessToken } from "@services/auth";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	memberships: Membership[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, accessToken, messages }) => {
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
