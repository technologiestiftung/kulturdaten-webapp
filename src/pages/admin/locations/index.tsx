import LocationsPage from "@components/pages/LocationsPage";
import { loadMessages } from "@services/i18n";
import withAuth from "@services/withAuth";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

export default withAuth(LocationsPage);
