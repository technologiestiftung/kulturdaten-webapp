import { ERROR_URL_PARAMETER } from "@common/routes";
import LoginPage from "@components/LoginPage";
import { loadMessages } from "@services/i18n";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => ({
	props: {
		initialErrorMessage: context.query?.[ERROR_URL_PARAMETER] || null,
		messages: await loadMessages(context.locale!),
	},
});

export default LoginPage;
