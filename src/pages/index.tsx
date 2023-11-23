import { Attraction } from "@api/client/models/Attraction";
import AttractionsPage from "@components/pages/AttractionsPage";
import { getPaginationProps } from "@services/pagination";
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
		return {
			props: {
				attractions,
				pagination: getPaginationProps(data),
				messages,
			},
		};
	});

export default withAuth(AttractionsPage);
