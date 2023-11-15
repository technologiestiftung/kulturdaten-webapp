import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import ROUTES from "@common/routes";
import { PaginationType } from "@components/Pagination";
import { decodeAccessToken, getAccessTokenFromContext } from "@utils/auth";
import { loadMessages } from "@utils/i18n";
import { getPagination } from "@utils/pagination";
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";

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

/**
 * Wrapper for getServerSideProps() function to generate access token, default pagination, and load i18n messages.
 * Also redirects to the login page if the token is missing or invalid.
 */
export function withApiClientAndPagination<Props>(context: GetServerSidePropsContext) {
	return async function (next: NextFunction<Props>) {
		const accessToken = getAccessTokenFromContext(context);
		if (!accessToken || !isTokenValid(accessToken)) {
			return LOGIN_REDIRECT;
		}
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPagination(context.query);
		const messages = await loadMessages(context.locale!);
		try {
			return await next({ apiClient, page, pageSize, messages, accessToken });
		} catch (error) {
			// TODO: Show cause of error on the login page (e.g. via URL parameter).
			return LOGIN_REDIRECT;
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

export function getPaginationProps(responseData: PaginationType): PaginationType {
	return {
		page: responseData.page,
		pageSize: responseData.pageSize,
		totalCount: responseData.totalCount,
	};
}
