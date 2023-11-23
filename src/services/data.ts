import { PaginationType } from "@components/Pagination";

export function getPaginationProps(responseData: PaginationType): PaginationType {
	return {
		page: responseData.page,
		pageSize: responseData.pageSize,
		totalCount: responseData.totalCount,
	};
}
