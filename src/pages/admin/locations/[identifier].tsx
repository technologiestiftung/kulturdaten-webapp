import { Location } from "@api/client/models/Location";
import LocationDetailsPage from "@components/LocationDetailsPage";
import { withApiClientAndPagination } from "@services/data";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	location: Location;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ apiClient, messages }) => {
		const identifier = context.query.identifier as string;
		const response = await apiClient.discoverCulturalData.getLocations1(identifier);
		const location = response.data!.location!;
		return {
			props: {
				location,
				messages,
			},
		};
	});

export default withAuth(LocationDetailsPage);
