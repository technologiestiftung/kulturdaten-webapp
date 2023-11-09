import { Membership } from "@common/types";
import UsersPage from "@components/UsersPage";
import { decodeAccessToken, getAccessTokenFromContext } from "@utils/auth";
import { withApiClientAndPagination } from "@utils/data";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	memberships: Membership[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async (apiClient, _page, _pageSize, messages) => {
		const accessToken = getAccessTokenFromContext(context);
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
