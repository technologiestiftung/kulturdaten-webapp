import AttractionDetailsPage from "@components/pages/AttractionDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attraction: null;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ messages }) => ({
		props: {
			attraction: null,
			messages,
		},
	}));

export default withAuth(AttractionDetailsPage);
