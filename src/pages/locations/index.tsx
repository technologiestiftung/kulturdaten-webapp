import LocationsPage from "@components/pages/LocationsPage";
import { getPaginationProps } from "@services/pagination";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof LocationsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ apiClient, page, pageSize }) => {
	const response = await apiClient.discoverCulturalData.getLocations(page, pageSize);
	const data = response.data!;
	return {
		props: {
			locations: data.locations || [],
			pagination: getPaginationProps(data),
		},
	};
});

export default withAuth(LocationsPage);
