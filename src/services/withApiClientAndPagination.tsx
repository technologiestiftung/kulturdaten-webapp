import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import { ApiError } from "@api/client/core/ApiError";
import ROUTES from "@common/routes";
import { decodeAccessToken, getAccessTokenFromContext } from "@services/auth";
import { loadMessages } from "@services/i18n";
import { getPaginationFromQuery } from "@services/pagination";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type ServerSideFunction<Props> = (parameters: {
	context: GetServerSidePropsContext;
	apiClient: APIClient;
	page: number;
	pageSize: number;
	accessToken: string;
}) => Promise<GetServerSidePropsResult<Props>>;

function isProps<Props>(result: GetServerSidePropsResult<Props>): result is { props: Props } {
	return "props" in result;
}

/**
 * Wrapper for getServerSideProps() function to generate access token, default pagination, and load i18n messages.
 * Also redirects to the login page if the token is missing or invalid.
 */
export default function withApiClientAndPagination<Props>(serverSideFunction: ServerSideFunction<Props>) {
	return async function (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
		const accessToken = getAccessTokenFromContext(context);
		if (!accessToken || !isTokenValid(accessToken)) {
			return {
				redirect: { destination: ROUTES.login(), permanent: false },
			};
		}
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPaginationFromQuery(context.query);

		try {
			const result = await serverSideFunction({
				context,
				apiClient,
				page,
				pageSize,
				accessToken,
			});
			if (!isProps(result)) {
				return result;
			}
			// Load i18n messages and add them to result props.
			return {
				...result,
				props: {
					...result.props,
					messages: await loadMessages(context.locale!),
				},
			};
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = `${apiError.message} (${apiError.status})`;
			return {
				redirect: { destination: ROUTES.login(errorMessage), permanent: false },
			};
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
