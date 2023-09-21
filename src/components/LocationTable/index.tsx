import { Location } from "@api/client/models/Location";
import Link from "next/link";
import { FC } from "react";
import LocationTableRow from "./LocationTableRow";

interface LocationTableProps {
	locations?: Location[];
	fetchLocations: () => void;
}

const LocationTable: FC<LocationTableProps> = ({ locations, fetchLocations }: LocationTableProps) => {
	return (
		<div className="w-full">
			<h1 className="text-base font-semibold leading-6 text-gray-900">Locations</h1>
			<p className="mt-2 text-sm text-gray-700">A list of all the registered locations</p>
			<Link className="leading-10" href={"/admin/locations/create"}>
				Add Location
			</Link>
			<div className="w-full overflow-x-scroll">
				<table className="divide-y divide-gray-300 min-w-full">
					<thead>
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
								Name
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Website
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Stadtteil
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
						{locations &&
							locations.map((location, key) => (
								<LocationTableRow key={key} location={location} fetchLocations={fetchLocations} />
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LocationTable;
