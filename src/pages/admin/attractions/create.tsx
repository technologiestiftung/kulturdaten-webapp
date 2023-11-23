import AdminAttractionDetailsPage from "@components/pages/AdminAttractionDetailsPage";
import { loadMessages } from "@services/i18n";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attraction: null;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async () => ({
		props: {
			attraction: null,
			messages: await loadMessages(context.locale!),
		},
	}));

export default withAuth(AdminAttractionDetailsPage);
