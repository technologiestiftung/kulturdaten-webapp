import AttractionDetailsPage from "@components/pages/AttractionDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof AttractionDetailsPage>;

export const getServerSideProps = withApiClientAndPagination<Props>(async ({ messages }) => ({
	props: {
		attraction: null,
		messages,
	},
}));

export default withAuth(AttractionDetailsPage);
