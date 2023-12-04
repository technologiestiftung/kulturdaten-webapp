import { AdminAttraction } from "@api/client/models/AdminAttraction";
import AttractionDetailsPage from "@components/pages/AttractionDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attraction: AdminAttraction;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, messages }) => {
		const identifier = context.query.identifier as string;
		const response = await apiClient.admin.getAdminAttractions1(identifier);
		const attraction = response.data!.attraction!;
		return {
			props: {
				attraction,
				messages,
			},
		};
	});

export default withAuth(AttractionDetailsPage);
