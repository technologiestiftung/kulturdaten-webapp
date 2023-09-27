import { PaginationType } from ".";

type Page = {
	index: number;
	label: string;
	active: boolean;
	interactive: boolean;
};

export function getTotalPages(pagination: PaginationType) {
	const { pageSize, totalCount } = pagination;
	return Math.ceil(totalCount / pageSize);
}

export function getPages(pagination: PaginationType) {
	const { page } = pagination;
	const paddingSize = 3;
	const totalPages = getTotalPages(pagination);
	const pages = Array.from({ length: totalPages }, (_, index) => {
		const isPadded = index < paddingSize || index >= totalPages - paddingSize;
		const number = index + 1;
		const active = number === page;
		const isIncluded = isPadded || active;
		if (isIncluded) {
			return {
				index,
				label: number.toString(),
				active,
				interactive: true,
			};
		}
		const isLeftDots = index === paddingSize;
		const isRightDots = page > paddingSize && page < totalPages - paddingSize && index === totalPages - paddingSize - 1;
		if (isLeftDots || isRightDots) {
			return {
				index,
				label: "…",
				active: false,
				interactive: false,
			};
		}
		return null;
	}).filter(Boolean) as Page[];
	return pages;
}
