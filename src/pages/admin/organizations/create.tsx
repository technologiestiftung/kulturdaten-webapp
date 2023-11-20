import OrganizationDetailsPage from "@components/OrganizationDetailsPage";
import { withApiClientAndPagination } from "@utils/data";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	organization: null;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async () => ({
		props: {
			organization: null,
			messages: await loadMessages(context.locale!),
		},
	}));

export default withAuth(OrganizationDetailsPage);
