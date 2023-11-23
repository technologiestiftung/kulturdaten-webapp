import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import ROUTES from "@common/routes";
import { decodeAccessToken, getAccessTokenFromContext } from "@services/auth";
import { loadMessages } from "@services/i18n";
import { getPaginationFromQuery } from "@services/pagination";
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";

/**
 * Wrapper for getServerSideProps() function to generate access token, default pagination, and load i18n messages.
 * Also redirects to the login page if the token is missing or invalid.
 */
export default function withApiClientAndPagination<Props>(context: GetServerSidePropsContext) {
	return async function (next: NextFunction<Props>) {
		const accessToken = getAccessTokenFromContext(context);
		if (!accessToken || !isTokenValid(accessToken)) {
			return LOGIN_REDIRECT;
		}
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPaginationFromQuery(context.query);
		const messages = await loadMessages(context.locale!);
		try {
			return await next({ apiClient, page, pageSize, messages, accessToken });
		} catch (error) {
			// TODO: Show cause of error on the login page (e.g. via URL parameter).
			return LOGIN_REDIRECT;
		}
	};
}

type NextFunction<Props> = (parameters: {
	apiClient: APIClient;
	page: number;
	pageSize: number;
	messages: object;
	accessToken: string;
}) => Promise<GetServerSidePropsResult<Props>>;

const LOGIN_REDIRECT: { redirect: Redirect } = {
	redirect: {
		destination: ROUTES.login(),
		permanent: false,
	},
};

function isTokenValid(accessToken: string) {
	const decodedAccessToken = decodeAccessToken(accessToken);
	const now = new Date();
	const nowMillis = now.getTime();
	const expirationMillis = decodedAccessToken.exp * 1_000;
	return nowMillis < expirationMillis;
}
