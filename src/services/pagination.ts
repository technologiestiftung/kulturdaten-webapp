import { ParsedUrlQuery } from "querystring";

const pageQueryParameter = "page";

export function getPagination(query: ParsedUrlQuery) {
	const page = Number(query[pageQueryParameter] || 1);
	const pageSize = 20;
	return { page, pageSize };
}

export function getQuery(page: number) {
	return {
		[pageQueryParameter]: page,
	};
}
