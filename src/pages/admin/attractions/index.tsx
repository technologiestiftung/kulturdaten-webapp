import { AdminAttraction } from "@api/client/models/AdminAttraction";
import AdminAttractionsPage from "@components/AdminAttractionsPage";
import { getPaginationProps, withApiClientAndPagination } from "@services/data";
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
