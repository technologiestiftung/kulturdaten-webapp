import { TableHeadCell } from './TableHeadCell';
import React, { FC, useState } from 'react';
import { TableCell } from './TableCell';
import { Organization } from '../../generated-api-client';
import { CulturalOrganization } from '../../pages/organisations';

export type TableHeadProps = {
	headers: string[];
};

type HeadersSorted = {
	[key: string]: {
		title: string;
		sorted: number;
	};
};

interface OrganisationTableProps {
	headers: string[];
	organisations: any[];
}

export const OrganisationTable: FC<OrganisationTableProps> = ({
	headers,
	organisations,
}: OrganisationTableProps) => {
	const createHeaderState = (headers: string[]): HeadersSorted => {
		return headers.reduce((headerState: HeadersSorted, header) => {
			const keyLow = header.toLowerCase();
			headerState[keyLow] = { title: header, sorted: 0 };
			return headerState;
		}, {});
	};

	const defaultHeaderState = createHeaderState(headers);
	const [sortedOrganisations, sortedOrganisationsSet] = useState(organisations);
	const [headersSorted, headersSortedSet] = useState<HeadersSorted>(defaultHeaderState);

	const sortAlphabetically = (key: string, reverse: boolean = false) => {
		const keyLow = key.toLowerCase();
		const sorted = [...sortedOrganisations].sort((a, b) => {
			let nameA = a[keyLow].toUpperCase();
			let nameB = b[keyLow].toUpperCase();
			if (nameA < nameB) {
				return -1;
			} else {
				return 1;
			}
		});
		if (headersSorted[keyLow].sorted == 1) {
			sortedOrganisationsSet(sorted.reverse());
			headersSortedSet({
				...defaultHeaderState,
				[keyLow]: { ...headersSorted[keyLow], sorted: -1 },
			});
		} else {
			sortedOrganisationsSet(sorted);
			headersSortedSet({
				...defaultHeaderState,
				[keyLow]: { ...headersSorted[keyLow], sorted: 1 },
			});
		}

		sortedOrganisationsSet(reverse ? sorted.reverse() : sorted);
	};

	const filterByString = (searchTerm: string) => {
		const keysToFilterBy = ['name', 'address', 'website'];
		const filtered = [...organisations].filter((organisation) => {
			return keysToFilterBy.some((key) => {
				return organisation[key].toLowerCase().includes(searchTerm.toLowerCase());
			});
		});
		headersSortedSet(defaultHeaderState);
		sortedOrganisationsSet(filtered);
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Organisations</h1>
					<p className="mt-2 text-sm text-gray-700">A list of all organisations in that list.</p>
				</div>
			</div>

			<label htmlFor="search">Suche nach </label>
			<input
				type="text"
				placeholder="Theater"
				className="mt-4"
				name="search"
				onChange={(e) => filterByString(e.target.value)}
			/>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									{headers.map((header) => (
										<TableHeadCell
											key={header}
											onClick={() => sortAlphabetically(headersSorted[header.toLowerCase()].title)}
										>
											{header}{' '}
											{headersSorted[header.toLowerCase()].sorted == 0
												? ''
												: headersSorted[header.toLowerCase()].sorted == 1
												? '▲'
												: '▼'}
										</TableHeadCell>
									))}
									<th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{sortedOrganisations.map((org) => (
									<tr key={org.name.de}>
										<TableCell>{org.name}</TableCell>
										<TableCell>{org.website}</TableCell>
										<TableCell>{org.address}</TableCell>
										<TableCell>{org.phone}</TableCell>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
