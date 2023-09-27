import LocationsPage from "@components/LocationsPage";
import { loadMessages } from "@utils/i18n";
import withAuth from "@utils/withAuth";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

export default withAuth(LocationsPage);
