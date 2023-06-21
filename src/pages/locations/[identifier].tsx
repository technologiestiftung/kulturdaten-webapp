import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PageWrapper from '../../components/PageWrapper';
import LocationEditor from '../../components/LocationEditor';
import withAuth from '../../utils/withAuth';
import FormWrapper from '../../components/FormWrapper';
import { LocationsService, PatchLocation, Location } from '../../generated-api-client';

const LocationDetails = () => {
	const router = useRouter();
	const [location, locationSet] = useState<Location | null>(null);
	const { identifier } = router.query;

	const fetchLocation = async () => {
		if (identifier) {
			try {
				const res = await LocationsService.getLocations1(identifier as string);
				const locationObject = res?.location;
				console.log('locationObject', locationObject);
				locationSet(locationObject || null);
			} catch (error) {
				console.log('ERROR', error);
			}
		}
	};

	useEffect(() => {
		if (identifier !== undefined) {
			fetchLocation();
		}
	}, [identifier]);

	const editLocation = (e: React.FormEvent<HTMLFormElement>, locationObject: Location) => {
		console.log('EDIT Location', locationObject);
		LocationsService.patchLocations(identifier as string, locationObject as PatchLocation)
			.then(() => {
				console.log('Location edited successfully');
				fetchLocation();
				router.push(`/locations/${identifier}`);
			})
			.catch((error) => {
				console.log('ERROR', error);
			});
	};

	if (location === null) {
		return <div>Loading...</div>;
	} else {
		return (
			<PageWrapper>
				<FormWrapper>
					<h1>Ort bearbeiten</h1>
					<p>Hier kannst du alle hinterlegten Infos einsehen und bearbeiten</p>
					<h2>{location.name?.de}</h2>
					<p>{location.website}</p>
					{location.borough && <p>{location.borough}</p>}
					<div className="mb-4"></div>
					<LocationEditor
						location={location}
						submitHandler={(e, locationObject) => editLocation(e, locationObject as Location)}
						submitLabel="Ort bearbeiten"
					/>
				</FormWrapper>
			</PageWrapper>
		);
	}
};
export default withAuth(LocationDetails);
