import { Attraction } from "@api/client/models/Attraction";
import AttractionsPage from "@components/pages/AttractionsPage";
import { PaginationType } from "@components/Pagination";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attractions: Attraction[];
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, page, pageSize, messages }) => {
		const response = await apiClient.discoverCulturalData.getAttractions(page, pageSize, false);
		const data = response.data!;
		const attractions = data.attractions || [];
		const pagination: PaginationType = {
			page: data.page!,
			pageSize: data.pageSize!,
			totalCount: data.totalCount!,
		};
		return {
			props: {
				attractions,
				pagination,
				messages,
			},
		};
	});

export default withAuth(AttractionsPage);
