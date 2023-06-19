import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateLocation, Location, LocationsService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import { useRouter } from 'next/router';
import withAuth from '../../utils/withAuth';
import { validatePostalCode } from '../../utils/validation';
import LocationEditor from '../../components/LocationEditor';
import FormWrapper from '../../components/FormWrapper';

const CreateNewLocation = () => {
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);

	const router = useRouter();

	const createLocationHandler = (e: FormEvent<HTMLFormElement>, newLocation: Location) => {
		e.preventDefault();
		console.log('CREATE Location');

		LocationsService.postLocations(newLocation as CreateLocation)
			.then((res) => {
				console.log('User created successfully', res.identifier);
				router.push(`/Locations/${res.identifier}`);
			})
			.catch((error: any) => {
				console.error('Error creating user:', error);
				// Uncomment for complete error report
				// Object.keys(error).map((key) => {
				// 	console.log(key, error[key]);
				// });
				if (error.status) {
					console.log('server error', error.status);
				} else {
					errorMessageSet(`Verbindung fehlgeschlagen ${error.status}`);
				}
			});
	};

	return (
		<PageWrapper>
			<FormWrapper>
				<h1>Lege einen neue Location an</h1>
				<LocationEditor
					submitHandler={(e, locationObject) =>
						createLocationHandler(e, locationObject as Location)
					}
					submitLabel="Organisation anlegen"
				/>
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</PageWrapper>
	);
};

export default withAuth(CreateNewLocation);
