import React, { useState, FC, FormEvent } from 'react';
import { CreateOrganization, OrganizationsService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import { useRouter } from 'next/router';
import withAuth from '../../utils/withAuth';
import { validatePostalCode } from '../../utils/validation';

const CreateOrganisation: FC = () => {
	const [organisationName, organisationNameSet] = useState<string>('');
	const [organisationDescription, organisationDescriptionSet] = useState<string>('');
	const [postalCode, postalCodeSet] = useState<string | undefined>(undefined);
	const [city, citySet] = useState<string>('');

	const router = useRouter();
	const createOrganisationHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('CREATE ORGANISATION');
		const newOrganisationObject: CreateOrganization = {
			name: { de: organisationName },
			description: { de: organisationDescription },
			address: {
				postalCode,
				addressLocality: city,
			},
		};
		OrganizationsService.postOrganizations(newOrganisationObject).then((res) => {
			router.push(`/organisations/${res.identifier}`);
		});
	};
	return (
		<PageWrapper>
			<h1>Lege einen enue Organisation an</h1>
			<form onSubmit={(e) => createOrganisationHandler(e)}>
				<Input
					type="text"
					id="organisationName"
					label={'Name'}
					required
					placeholder={'Hier bitte Name eingeben … '}
					onChange={(value) => organisationNameSet(value)}
				/>
				<Input
					type="text"
					id="organisationDescription"
					label={'Beschreibung'}
					placeholder={'Hier bitte Beschreeibung eingeben … '}
					onChange={(value) => organisationDescriptionSet(value)}
				/>
				<Input
					type="text"
					id="postalCode"
					label={'Postleitzahl'}
					placeholder={'Hier bitte PLZ eingeben … '}
					onChange={(value) => postalCodeSet(value)}
					validate={(value) => validatePostalCode(value)}
				/>
				<Input
					type="text"
					id="city"
					label={'Ort'}
					placeholder={'Hier bitte den Ort eingeben … '}
					onChange={(value) => citySet(value)}
				/>
				<Button type="submit" label="Anlegen" />
			</form>
		</PageWrapper>
	);
};

export default withAuth(CreateOrganisation);
