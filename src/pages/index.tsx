import apiClient from "@api/client";
import { Attraction } from "@api/client/models/Attraction";
import AttractionsPage from "@components/AttractionsPage";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attractions: Attraction[];
}

async function getAttractions(page: number, pageSize: number): Promise<Attraction[]> {
	const response = await apiClient.discoverCulturalData.getAttractions(false, page, pageSize);
	const attractions = response.data!.attractions || [];
	return attractions;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const attractions = await getAttractions(1, 20);
	return {
		props: {
			attractions,
			messages: (await import(`../../i18n/${context.locale}.json`)).default,
		},
	};
};

export default withAuth(AttractionsPage);
