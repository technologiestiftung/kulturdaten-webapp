import React, { FC } from 'react';

interface TableHeadCellProps {
	children: any;
	key: string;
	onClick: () => void;
}
export const TableHeadCell: FC<TableHeadCellProps> = ({
	children,
	onClick,
}: TableHeadCellProps) => {
	return (
		<th
			scope="col"
			onClick={onClick}
			className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
		>
			{children}
		</th>
	);
};
