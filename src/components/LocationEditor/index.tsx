import React, { useState, FC, FormEvent, useEffect } from 'react';
import { CreateLocation, Location } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';
import _ from 'lodash';
import { validatePostalCode } from '../../utils/validation';
import Dropdown from '../Dropdown';

interface ErrorMessages {
	postalCode: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	postalCode: undefined,
	general: undefined,
};

interface LocationEditorProps {
	location?: Location;
	submitHandler: (e: FormEvent<HTMLFormElement>, newLocation: CreateLocation | Location) => void;
	submitLabel: string;
}

const LocationEditor: FC<LocationEditorProps> = ({ location, submitHandler, submitLabel }) => {
	const [locationObject, locationObjectSet] = useState<CreateLocation | Location | undefined>(
		location || undefined
	);
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);
	const [formValid, formValidSet] = useState<boolean>(true);

	const barrios = Object.entries(CreateLocation.borough).map(([key, value]) => ({
		value: key,
		label: value,
	}));

	useEffect(() => {
		// check for error messages and required fields
		const locationName = locationObject?.name?.de || '';
		if (
			locationName.length > 0 &&
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
	}, [locationObject, errorMessages]);

	const onChange = (
		value: string,
		id: string,
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		const newLocation = { ...locationObject };
		_.set(newLocation, id, value);
		console.log('newLocation', newLocation);
		locationObjectSet(newLocation);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		if (formValid) {
			submitHandler(e as FormEvent<HTMLFormElement>, locationObject as CreateLocation | Location);
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
				initialValue={locationObject?.name?.de || ''}
				label="Name (Pflichtfeld)"
				required
				placeholder={'Hier bitte Name eingeben … '}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Input
				type="text"
				id="website"
				initialValue={locationObject?.website || ''}
				label="Webseite"
				placeholder={'www.my-location.com'}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Dropdown
				label="Bezirk"
				id="borough"
				options={barrios}
				value={locationObject?.borough || ''}
				onChange={(value, id, e) => onChange(value, id, e)}
			/>
			<Button type="submit" label={submitLabel} />
			{errorMessages.general && <span aria-live="assertive">{errorMessages.general}</span>}
		</form>
	);
};

export default LocationEditor;
