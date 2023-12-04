import OrganizationDetailsPage from "@components/pages/OrganizationDetailsPage";
import { loadMessages } from "@services/i18n";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
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
