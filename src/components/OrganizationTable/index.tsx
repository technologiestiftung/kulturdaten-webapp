import Link from "next/link";
import { FC } from "react";
import { Organization } from "../../api/client/models/Organization";
import OrganizationTableRow from "./OrganizationTableRow";

interface OrganizationTableProps {
	organizations?: Organization[];
	fetchOrganizations: () => void;
}

const OrganizationTable: FC<OrganizationTableProps> = ({
	organizations,
	fetchOrganizations,
}: OrganizationTableProps) => {
	return (
		<div className="w-full">
			<h1 className="text-base font-semibold leading-6 text-gray-900">Organizations</h1>
			<p className="mt-2 text-sm text-gray-700">A list of all the registered organizations</p>
			<Link className="leading-10" href={"/organizations/create"}>
				Add Organization
			</Link>
			<div className="w-full overflow-x-scroll">
				<table className="divide-y divide-gray-300 min-w-full">
					<thead>
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
								Name
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								PLZ
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
								<OrganizationTableRow key={key} organization={organization} fetchOrganizations={fetchOrganizations} />
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrganizationTable;
