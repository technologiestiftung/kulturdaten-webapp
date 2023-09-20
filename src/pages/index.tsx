import apiClient from "@api/client";
import { Attraction } from "@api/client/models/Attraction";
import AttractionsPage from "@components/AttractionsPage";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";
import { PaginationType } from "../components/Pagination";

interface Props {
	attractions: Attraction[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const page = Number(context.query?.page || 1);
	const pageSize = 20;
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
			messages: (await import(`../../i18n/${context.locale}.json`)).default,
		},
	};
};

export default withAuth(AttractionsPage);
