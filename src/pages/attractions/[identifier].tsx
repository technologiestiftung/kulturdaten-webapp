import AttractionDetailsPage from "@components/pages/AttractionDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof AttractionDetailsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ context, apiClient, messages }) => {
	const identifier = context.query.identifier as string;
	const response = await apiClient.admin.getAdminAttractions1(identifier);
	const attraction = response.data!.attraction!;
	return {
		props: {
			attraction,
			messages,
		},
	};
});

export default withAuth(AttractionDetailsPage);
