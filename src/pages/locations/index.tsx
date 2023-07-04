import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Location, LocationsService } from '../../generated-api-client';
import LocationTable from '../../components/LocationTable';

const LocationList = () => {
	const [locations, setLocations] = useState<Location[] | undefined>(undefined);

	const fetchLocations = () => {
		LocationsService.getLocations()
			.then((res) => {
				const locationsObject = res?.locations;
				setLocations(locationsObject || undefined);
			})
			.catch((error) => {
				console.log('Error fetching locations:', error);
			});
	};

	useEffect(() => {
		fetchLocations();
		console.log('LocationList');
	}, []);

	return (
		<PageWrapper>
			<div className="w-full"></div>
			{locations ? (
				<LocationTable locations={locations} fetchLocations={fetchLocations} />
			) : (
				<div>Loading...</div>
			)}
		</PageWrapper>
	);
};

export default LocationList;
