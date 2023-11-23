import { PaginationType } from "@common/types";
import { ParsedUrlQuery } from "querystring";

const pageQueryParameter = "page";

export function getPaginationFromQuery(query: ParsedUrlQuery) {
	const page = Number(query[pageQueryParameter] || 1);
	const pageSize = 20;
	return { page, pageSize };
}

export function getQuery(page: number) {
	return {
		[pageQueryParameter]: page,
	};
}

export function getPaginationProps(responseData: PaginationType): PaginationType {
	return {
		page: responseData.page,
		pageSize: responseData.pageSize,
		totalCount: responseData.totalCount,
	};
}
