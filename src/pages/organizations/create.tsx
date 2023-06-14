import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateOrganization, Organization, OrganizationsService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import PageWrapper from '../../components/PageWrapper';
import { useRouter } from 'next/router';
import withAuth from '../../utils/withAuth';
import { validatePostalCode } from '../../utils/validation';
import OrganizationEditor from '../../components/OrganisationEditor';
import FormWrapper from '../../components/FormWrapper';

const CreateNewOrganization: FC = () => {
	const [errorMessage, errorMessageSet] = useState<string | undefined>(undefined);

	const router = useRouter();

	const createOrganizationHandler = (
		e: FormEvent<HTMLFormElement>,
		newOrganization: CreateOrganization
	) => {
		e.preventDefault();
		console.log('CREATE Organization');

		OrganizationsService.postOrganizations(newOrganization as CreateOrganization)
			.then((res) => {
				console.log('User created successfully', res.identifier);
				router.push(`/organizations/${res.identifier}`);
			})
			.catch((error: any) => {
				console.error('Error creating user:', error);
				// Uncomment for complete error report
				// Object.keys(error).map((key) => {
				// 	console.log(key, error[key]);
				// });
				if (error.status) {
					console.log('server error', error.status);
					switch (error.status) {
						case 409:
							errorMessageSet(`Email bereits vergeben ${error.status}`);
							break;
						default:
							errorMessageSet(`Unbekannter Fehler ${error.status}`);
					}
				} else {
					errorMessageSet(`Verbindung fehlgeschlagen ${error.status}`);
				}
			});
	};

	return (
		<PageWrapper>
			<FormWrapper>
				<h1>Lege einen neue Organization an</h1>
				<OrganizationEditor
					submitHandler={createOrganizationHandler}
					submitLabel="Organisation anlegen"
				/>
				{errorMessage && <span aria-live="assertive">{errorMessage}</span>}
			</FormWrapper>
		</PageWrapper>
	);
};

export default withAuth(CreateNewOrganization);
