import { withApiClientAndPagination } from "@utils/data";
import { Location } from "@api/client/models/Location";
import { GetServerSideProps } from "next";
import LocationDetailsPage from "@/src/components/LocationDetailsPage";
import withAuth from "@/src/utils/withAuth";

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
