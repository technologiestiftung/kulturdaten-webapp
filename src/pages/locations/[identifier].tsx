import LocationDetailsPage from "@components/pages/LocationDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof LocationDetailsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ context, apiClient }) => {
	const identifier = context.query.identifier as string;
	const response = await apiClient.discoverCulturalData.getLocations1(identifier);
	const location = response.data!.location!;
	return {
		props: {
			location,
		},
	};
});

export default withAuth(LocationDetailsPage);
