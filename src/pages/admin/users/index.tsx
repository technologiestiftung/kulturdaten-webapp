import { getPaginationProps, withApiClientAndPagination } from "@/src/utils/data";
import { User } from "@api/client/models/User";
import UsersPage from "@components/UsersPage";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	users: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async (apiClient, page, pageSize, messages) => {
		// TODO: Use apiClient.manageYourOrganizationData.getOrganizationsMemberships()
		const response = await apiClient.users.getUsers(page, pageSize);
		const data = response.data!;
		return {
			props: {
				users: data.users || [],
				pagination: getPaginationProps(data),
				messages,
			},
		};
	});

export default withAuth(UsersPage);
