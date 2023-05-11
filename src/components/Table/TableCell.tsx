import React from 'react';

export const TableCell = ({ children }: any) => {
	return (
		<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
			{children}
		</td>
	);
};
