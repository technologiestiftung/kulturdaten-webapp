import { createAuthorizedClient } from "@api/client";
import { APIClient } from "@api/client/APIClient";
import { PaginationType } from "@components/Pagination";
import { getAccessTokenFromContext } from "@utils/auth";
import { loadMessages } from "@utils/i18n";
import { getPagination } from "@utils/pagination";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type NextFunction<Props> = (
	apiClient: APIClient,
	page: number,
	pageSize: number,
	messages: object,
) => Promise<GetServerSidePropsResult<Props>>;

/**
 * Wrapper for getServerSideProps() function to generate access token, default pagination, and load i18n messages.
 */
export function withApiClientAndPagination<Props>(context: GetServerSidePropsContext) {
	return async function (next: NextFunction<Props>) {
		const accessToken = getAccessTokenFromContext(context);
		// TODO: Handle missing access token.
		const apiClient = createAuthorizedClient(accessToken);
		const { page, pageSize } = getPagination(context.query);
		const messages = await loadMessages(context.locale!);
		return await next(apiClient, page, pageSize, messages);
	};
}

export function getPaginationProps(responseData: PaginationType): PaginationType {
	return {
		page: responseData.page,
		pageSize: responseData.pageSize,
		totalCount: responseData.totalCount,
	};
}
