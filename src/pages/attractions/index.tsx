import AttractionsPage from "@components/pages/AttractionsPage";
import { getPaginationProps } from "@services/pagination";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof AttractionsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ apiClient, page, pageSize, messages }) => {
	const response = await apiClient.admin.getAdminAttractions(page, pageSize);
	const data = response.data!;
	return {
		props: {
			attractions: data.attractions || [],
			pagination: getPaginationProps(data),
			messages,
		},
	};
});

export default withAuth(AttractionsPage);
