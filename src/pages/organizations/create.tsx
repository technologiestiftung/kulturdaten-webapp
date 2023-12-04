import OrganizationDetailsPage from "@components/pages/OrganizationDetailsPage";
import withApiClientAndPagination from "@services/withApiClientAndPagination";
import withAuth from "@services/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	organization: null;
}

export const getServerSideProps: GetServerSideProps<Props> = (context) =>
	withApiClientAndPagination<Props>(context)(async ({ messages }) => ({
		props: {
			organization: null,
			messages,
		},
	}));

export default withAuth(OrganizationDetailsPage);
