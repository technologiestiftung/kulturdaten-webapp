import AdminAttractionDetailsPage from "@components/AdminAttractionDetailsPage";
import { withApiClientAndPagination } from "@utils/data";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
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
