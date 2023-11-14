import { createAuthorizedClient } from "@api/client";
import { Location } from "@api/client/models/Location";
import LocationDetailsPage from "@components/LocationDetailsPage";
import { getAccessTokenFromContext } from "@utils/auth";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	location: Location;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const accessToken = getAccessTokenFromContext(context);
	const apiClient = createAuthorizedClient(accessToken);
	const identifier = context.query.identifier as string;
	const response = await apiClient.discoverCulturalData.getLocations1(identifier);
	const location = response.data!.location!;
	return {
		props: {
			location,
			messages: await loadMessages(context.locale!),
		},
	};
};

export default withAuth(LocationDetailsPage);
