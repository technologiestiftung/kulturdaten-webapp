import LocationDetailsPage from "@components/LocationDetailsPage";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	location: null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => ({
	props: {
		location: null,
		messages: await loadMessages(context.locale!),
	},
});

export default withAuth(LocationDetailsPage);
