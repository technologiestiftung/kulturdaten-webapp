import React, { FC } from 'react';
import { Organization } from '../../generated-api-client';
import Link from 'next/link';
import OrganizationTableRow from './OrganizationTableRow';
interface OrganizationTableProps {
	organizations?: Organization[];
	fetchOrganizations: () => void;
}

const OrganizationTable: FC<OrganizationTableProps> = ({
	organizations,
	fetchOrganizations,
}: OrganizationTableProps) => {
	return (
		<div className="px-4 sm:px-6 lg:px-8 overflow-x-scroll overflow-y-hidden">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
					<p className="mt-2 text-sm text-gray-700">A list of all the registered organizations</p>
					<Link className="leading-10" href={'/organizations/create'}>
						Add Organization
					</Link>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										PLZ
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Ort
									</th>

									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th>

									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Delete</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{organizations &&
									organizations.map((organization, key) => (
										<OrganizationTableRow
											key={key}
											organization={organization}
											fetchOrganizations={fetchOrganizations}
										/>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrganizationTable;
