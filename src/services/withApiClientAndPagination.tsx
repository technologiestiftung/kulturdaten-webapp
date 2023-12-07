import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import { ApiError } from "@api/client/core/ApiError";
import ROUTES from "@common/routes";
import { decodeAccessToken, getAccessTokenFromContext } from "@services/auth";
import { loadMessages } from "@services/i18n";
import { getPaginationFromQuery } from "@services/pagination";
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";

type ServerSideFunction<Props> = (parameters: {
	context: GetServerSidePropsContext;
	apiClient: APIClient;
	page: number;
	pageSize: number;
	messages: object;
	accessToken: string;
}) => Promise<GetServerSidePropsResult<Props>>;

/**
 * Wrapper for getServerSideProps() function to generate access token, default pagination, and load i18n messages.
 * Also redirects to the login page if the token is missing or invalid.
 */
export default function withApiClientAndPagination<Props>(serverSideFunction: ServerSideFunction<Props>) {
	return async function (context: GetServerSidePropsContext) {
		const accessToken = getAccessTokenFromContext(context);
		if (!accessToken || !isTokenValid(accessToken)) {
			const loginRedirect: { redirect: Redirect } = {
				redirect: {
					destination: ROUTES.login(),
					permanent: false,
				},
			};
			return loginRedirect;
		}
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPaginationFromQuery(context.query);
		const messages = await loadMessages(context.locale!);
		try {
			return await serverSideFunction({ context, apiClient, page, pageSize, messages, accessToken });
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = `${apiError.message} (${apiError.status})`;
			const loginRedirect: { redirect: Redirect } = {
				redirect: {
					destination: ROUTES.login(errorMessage),
					permanent: false,
				},
			};
			return loginRedirect;
		}
	};
}

function isTokenValid(accessToken: string) {
	const decodedAccessToken = decodeAccessToken(accessToken);
	const now = new Date();
	const nowMillis = now.getTime();
	const expirationMillis = decodedAccessToken.exp * 1_000;
	return nowMillis < expirationMillis;
}
