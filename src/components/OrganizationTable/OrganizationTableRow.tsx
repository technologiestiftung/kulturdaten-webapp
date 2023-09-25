import { Organization } from "@api/client/models/Organization";
import ROUTES from "@common/routes";
import { FC } from "react";

interface OrganizationTableRowProps {
	organization: Organization;
	fetchOrganizations: () => void;
}
const OrganizationTableRow: FC<OrganizationTableRowProps> = ({ organization }: OrganizationTableRowProps) => {
	const deleteOrganization = (/* identifier: string */) => {
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
				<button onClick={() => deleteOrganization(/* organization.identifier */)}>Delete</button>
				<span className="sr-only">, {organization.title?.de || "no name"}</span>
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
				<a
					href={ROUTES.admin.organizationDetails(organization.identifier)}
					className="text-indigo-600 hover:text-indigo-900"
				>
					Edit<span className="sr-only"> {organization.title?.de || "no name"}</span>
				</a>
			</td>
		</tr>
	);
};

export default OrganizationTableRow;
