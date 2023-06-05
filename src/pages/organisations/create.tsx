import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateOrganization, OrganizationsService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import { useRouter } from 'next/router';
import withAuth from '../../utils/withAuth';
import { validatePostalCode } from '../../utils/validation';

interface ErrorMessages {
	postalCode: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	postalCode: undefined,
	general: undefined,
};

const CreateOrganisation: FC = () => {
	const [organisationName, organisationNameSet] = useState<string>('');
	const [organisationNamePristine, organisationNamePristineSet] = useState<boolean>(true);
	const [organisationDescription, organisationDescriptionSet] = useState<string>('');
	const [postalCode, postalCodeSet] = useState<string | undefined>(undefined);
	const [city, citySet] = useState<string>('');
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);
	const [formValid, formValidSet] = useState<boolean>(true);

	const router = useRouter();

	useEffect(() => {
		if (
			!organisationNamePristine &&
			Object.values(errorMessages)
				//exclude the general error from the check
				.filter((error) => error !== errorMessages.general)
				.reduce((acc, curr) => acc + curr, '').length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [errorMessages, organisationNamePristine]);
	const createOrganisationHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('CREATE ORGANISATION');

		if (formValid) {
			const newOrganisationObject: CreateOrganization = {
				name: { de: organisationName },
				description: { de: organisationDescription },
				address: {
					postalCode,
					addressLocality: city,
				},
			};
			try {
				OrganizationsService.postOrganizations(newOrganisationObject).then((res) => {
					console.log('User created successfully', res.identifier);
					router.push(`/organisations/${res.identifier}`);
				});
			} catch (error: any) {
				console.error('Error creating user:', error);
				// Uncomment for complete error report
				// Object.keys(error).map((key) => {
				// 	console.log(key, error[key]);
				// });
				if (error.status) {
					console.log('server error', error.status);
					switch (error.status) {
						case 409:
							errorMessagesSet({
								...errorMessages,
								general: `Email bereits vergeben ${error.status}`,
							});
							break;
						default:
							errorMessagesSet({
								...errorMessages,
								general: `Unbekannter Fehler ${error.status}`,
							});
					}
				} else {
					errorMessagesSet({
						...errorMessages,
						general: `Verbindung fehlgeschlagen ${error.status}`,
					});
				}
			}
		} else {
			console.log('Eingabe fehlerhaft');
		}
	};

	const onChange = (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
		switch (id) {
			case 'postalCode':
				const postalCodeValid = validatePostalCode(value);
				errorMessagesSet({ ...errorMessages, postalCode: postalCodeValid, general: undefined });
				postalCodeSet(value);
				break;
			default:
				console.log('no id', id);
		}
	};

	return (
		<PageWrapper>
			<h1>Lege einen neue Organisation an</h1>
			<form onSubmit={(e) => createOrganisationHandler(e)}>
				<Input
					type="text"
					id="organisationName"
					label={'Name (Pflichtfeld)'}
					required
					setPristine={organisationNamePristineSet}
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
					onChange={(value, id, e) => onChange(value, id, e)}
					errorMessage={postalCode ? errorMessages.postalCode : undefined}
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
