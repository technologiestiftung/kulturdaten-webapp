import AdminAttractionDetailsPage from "@components/pages/AdminAttractionDetailsPage";
import { withApiClientAndPagination } from "@services/data";
import { loadMessages } from "@services/i18n";
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
