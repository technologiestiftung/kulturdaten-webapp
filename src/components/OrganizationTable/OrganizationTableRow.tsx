import React, { FC, FormEvent } from "react";
import { Organization } from "../../api/client/models/Organization";
import apiClient from "@/src/api/client";

interface OrganizationTableRowProps {
	organization: Organization;
	fetchOrganizations: () => void;
}
const OrganizationTableRow: FC<OrganizationTableRowProps> = ({
	organization,
	fetchOrganizations,
}: OrganizationTableRowProps) => {
	const deleteOrganization = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, identifier: string) => {
		console.log("DELETE Organization", identifier);
		// TODO: Deleting organizations is not yet implemented on API side.
		// apiClient.maintainCulturalData
		// 	.deleteOrganizations(identifier)
		// 	.then(() => {
		// 		console.log('Organization deleted successfully');
		// 		fetchOrganizations();
		// 	})
		// 	.catch((error) => {
		// 		console.log('ERROR', error);
		// 	});
	};

	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{organization.title?.de || "no name"}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{organization.address?.postalCode || "no PLZ"}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{organization.address?.addressLocality || "no location"}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button onClick={(e) => deleteOrganization(e, organization.identifier)}>Delete</button>
				<span className="sr-only">, {organization.title?.de || "no name"}</span>
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
				<a href={`/organizations/${organization.identifier}`} className="text-indigo-600 hover:text-indigo-900">
					Edit<span className="sr-only"> {organization.title?.de || "no name"}</span>
				</a>
			</td>
		</tr>
	);
};

export default OrganizationTableRow;
