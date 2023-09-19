import LocationsPage from "@components/LocationsPage";
import withAuth from "@utils/withAuth";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: (await import(`../../../i18n/${context.locale}.json`)).default,
	},
});

export default withAuth(LocationsPage);
