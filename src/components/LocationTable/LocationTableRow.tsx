import React, { FC, FormEvent } from 'react';
import { Location, LocationsService } from '../../generated-api-client';

interface LocationTableRowProps {
	location: Location;
	fetchLocations: () => void;
}
const LocationTableRow: FC<LocationTableRowProps> = ({
	location,
	fetchLocations,
}: LocationTableRowProps) => {
	const deleteLocation = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		identifier: string
	) => {
		console.log('DELETE Location', identifier);
		LocationsService.deleteLocations(identifier)
			.then(() => {
				console.log('Location deleted successfully');
				fetchLocations();
			})
			.catch((error) => {
				console.log('ERROR', error);
			});
	};

	return (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{location.name?.de || 'no name'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{location.website || 'no URL'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{location.borough || 'no borough'}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<button onClick={(e) => deleteLocation(e, location.identifier)}>Delete</button>
				<span className="sr-only">, {location.name?.de || 'no name'}</span>
			</td>
			<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
				<a
					href={`/locations/${location.identifier}`}
					className="text-indigo-600 hover:text-indigo-900"
				>
					Edit<span className="sr-only">, {location.name?.de || 'no name'}</span>
				</a>
			</td>
		</tr>
	);
};

export default LocationTableRow;