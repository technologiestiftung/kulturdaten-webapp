import AdminAttractionDetailsPage from "@components/AdminAttractionDetailsPage";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attraction: null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => ({
	props: {
		attraction: null,
		messages: await loadMessages(context.locale!),
	},
});

export default withAuth(AdminAttractionDetailsPage);
