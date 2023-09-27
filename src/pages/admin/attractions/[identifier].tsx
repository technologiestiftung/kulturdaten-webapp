import { createAuthorizedClient } from "@api/client";
import { AdminAttraction } from "@api/client/models/AdminAttraction";
import AdminAttractionDetailsPage from "@components/AdminAttractionDetailsPage";
import { getAccessTokenFromContext } from "@utils/auth";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attraction: AdminAttraction;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const accessToken = getAccessTokenFromContext(context);
	const apiClient = createAuthorizedClient(accessToken);
	const identifier = context.query.identifier as string;
	const response = await apiClient.admin.getAdminAttractions1(identifier);
	const attraction = response.data!.attraction!;
	return {
		props: {
			attraction,
			messages: await loadMessages(context.locale!),
		},
	};
};

export default withAuth(AdminAttractionDetailsPage);
