import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateOrganization } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import _ from 'lodash';
import { validatePostalCode } from '../../utils/validation';

interface ErrorMessages {
	postalCode: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	postalCode: undefined,
	general: undefined,
};

interface OrganizationEditorProps {
	organization?: CreateOrganization;
	submitHandler: (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganization) => void;
}

const OrganizationEditor: FC<OrganizationEditorProps> = ({ organization, submitHandler }) => {
	const [organizationObject, organizationObjectSet] = useState<CreateOrganization | undefined>(
		organization || undefined
	);
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);
	const [formValid, formValidSet] = useState<boolean>(true);

	useEffect(() => {
		// check for error messages and required fields
		const organizationName = organizationObject?.name?.de || '';
		if (
			organizationName.length > 0 &&
			Object.values(errorMessages)
				//exclude the general error from the check
				.filter((error) => error !== errorMessages.general)
				.reduce((acc, curr) => acc + curr, '').length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [organizationObject, errorMessages]);

	const onChange = (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
		const newOrganization = { ...organizationObject };
		_.set(newOrganization, id, value);
		console.log('newOrganization', newOrganization);
		organizationObjectSet(newOrganization as CreateOrganization);
		// if (id === 'address.postalCode') {
		//   const errorMessage = validatePostalCode(value);
		//   errorMessagesSet((prev) => ({ ...prev, postalCode: errorMessage }));
		// }
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitHandler(e, organizationObject as CreateOrganization);
	};

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<Input
				type="text"
				id="name.de"
				label={'Name (Pflichtfeld)'}
				required
				// setPristine={organizationNamePristineSet}
				placeholder={'Hier bitte Name eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Input
				type="text"
				id="description.de"
				label={'Beschreibung'}
				placeholder={'Hier bitte Beschreeibung eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Input
				type="text"
				id="address.postalCode"
				label={'Postleitzahl'}
				placeholder={'Hier bitte PLZ eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
				// errorMessage={postalCode ? errorMessages.postalCode : undefined}
			/>
			<Input
				type="text"
				id="address.addressLocality"
				label={'Ort'}
				placeholder={'Hier bitte den Ort eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Button type="submit" label="Anlegen" />
		</form>
	);
};

export default OrganizationEditor;
