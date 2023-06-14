import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateOrganization, Organization } from '../../generated-api-client';
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
	organization?: CreateOrganization | Organization;
	submitHandler: (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganization) => void;
	submitLabel: string;
}

const OrganizationEditor: FC<OrganizationEditorProps> = ({
	organization,
	submitHandler,
	submitLabel,
}) => {
	const [organizationObject, organizationObjectSet] = useState<
		CreateOrganization | Organization | undefined
	>(organization || undefined);
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);
	const [postalCodePristine, postalCodePristineSet] = useState<boolean>(true);
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
			errorMessagesSet((prev) => initialerrorMessages);
		} else {
			formValidSet(false);
		}
	}, [organizationObject, errorMessages]);

	const onChange = (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
		const newOrganization = { ...organizationObject };
		_.set(newOrganization, id, value);
		console.log('newOrganization', newOrganization);
		organizationObjectSet(newOrganization as CreateOrganization);
		if (id === 'address.postalCode') {
			const errorMessage = validatePostalCode(value);
			errorMessagesSet((prev) => ({ ...prev, postalCode: errorMessage }));
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValid) {
			submitHandler(e, organizationObject as CreateOrganization);
		} else {
			errorMessagesSet((prev) => ({
				...prev,
				general: 'Bitte alle Pflichtfelder korrekt ausfüllen',
			}));
		}
	};

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<Input
				type="text"
				id="name.de"
				initialValue={organizationObject?.name?.de || ''}
				label={'Name (Pflichtfeld)'}
				required
				placeholder={'Hier bitte Name eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Input
				type="text"
				id="description.de"
				initialValue={organizationObject?.description?.de || ''}
				label={'Beschreibung'}
				placeholder={'Hier bitte Beschreibung eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Input
				type="text"
				id="address.postalCode"
				initialValue={organizationObject?.address?.postalCode || ''}
				label={'Postleitzahl'}
				placeholder={'Hier bitte PLZ eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
				setPristine={postalCodePristineSet}
				errorMessage={
					!postalCodePristine && organizationObject?.address?.postalCode
						? errorMessages.postalCode
						: undefined
				}
			/>
			<Input
				type="text"
				id="address.addressLocality"
				initialValue={organizationObject?.address?.addressLocality || ''}
				label={'Ort'}
				placeholder={'Hier bitte den Ort eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Button type="submit" label={submitLabel} />
			{errorMessages.general && <span aria-live="assertive">{errorMessages.general}</span>}
		</form>
	);
};

export default OrganizationEditor;
