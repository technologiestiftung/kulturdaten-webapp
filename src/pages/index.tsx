import apiClient from "@api/client";
import { Attraction } from "@api/client/models/Attraction";
import AttractionsPage from "@components/AttractionsPage";
import { PaginationType } from "@components/Pagination";
import { loadMessages } from "@utils/i18n";
import { getPagination } from "@utils/pagination";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attractions: Attraction[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const { page, pageSize } = getPagination(context.query);
	const response = await apiClient.discoverCulturalData.getAttractions(false, page, pageSize);
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
			messages: await loadMessages(context.locale!),
		},
	};
};

export default withAuth(AttractionsPage);
