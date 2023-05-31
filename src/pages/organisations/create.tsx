import React, { useState, FC } from 'react';
import { CreateOrganization, OrganizationsService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import { useRouter } from 'next/router';
import { isTextValidation } from '../../utils/validation';

const CreateOrganisation: FC = () => {
	const [organisationName, organisationNameSet] = useState<string>('');
	const [organisationDescription, organisationDescriptionSet] = useState<string>('');

	const router = useRouter();
	const createOrganisationHandler = (e: Event) => {
		e.preventDefault();
		console.log('CREATE ORGANISATION');
		const newOrganisationObject: CreateOrganization = {
			name: { de: organisationName },
			description: { de: organisationDescription },
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
				<Button type="submit" label="Anlegen" />
			</form>
		</PageWrapper>
	);
};

export default CreateOrganisation;
