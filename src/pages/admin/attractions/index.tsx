import { AdminAttraction } from "@api/client/models/AdminAttraction";
import AdminAttractionsPage from "@components/pages/AdminAttractionsPage";
import { getPaginationProps } from "@services/data";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attractions: AdminAttraction[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, page, pageSize, messages }) => {
		const response = await apiClient.admin.getAdminAttractions(page, pageSize);
		const data = response.data!;
		return {
			props: {
				attractions: data.attractions || [],
				pagination: getPaginationProps(data),
				messages,
			},
		};
	});

export default withAuth(AdminAttractionsPage);
