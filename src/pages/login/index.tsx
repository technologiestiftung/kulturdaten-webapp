import LoginPage from "@components/LoginPage";
import { loadMessages } from "@services/i18n";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => ({
	props: {
		messages: await loadMessages(context.locale!),
	},
});

export default LoginPage;
