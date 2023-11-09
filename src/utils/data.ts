import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import ROUTES from "@common/routes";
import { PaginationType } from "@components/Pagination";
import { getAccessTokenFromContext } from "@utils/auth";
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
 */
export function withApiClientAndPagination<Props>(context: GetServerSidePropsContext) {
	return async function (next: NextFunction<Props>) {
		const accessToken = getAccessTokenFromContext(context);
		if (!accessToken) {
			return LOGIN_REDIRECT;
		}
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPagination(context.query);
		const messages = await loadMessages(context.locale!);
		try {
			return await next({ apiClient, page, pageSize, messages, accessToken });
		} catch (error) {
			return LOGIN_REDIRECT;
		}
	};
}

export function getPaginationProps(responseData: PaginationType): PaginationType {
	return {
		page: responseData.page,
		pageSize: responseData.pageSize,
		totalCount: responseData.totalCount,
	};
}
