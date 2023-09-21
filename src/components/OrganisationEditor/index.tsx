import { CreateOrganizationRequest } from "@api/client/models/CreateOrganizationRequest";
import { Organization } from "@api/client/models/Organization";
import { validatePostalCode } from "@utils/validation";
import _ from "lodash";
import { FC, FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputField";

interface ErrorMessages {
	postalCode: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	postalCode: undefined,
	general: undefined,
};

interface OrganizationEditorProps {
	organization?: CreateOrganizationRequest | Organization;
	submitHandler: (e: FormEvent<HTMLFormElement>, newOrganization: CreateOrganizationRequest) => void;
	submitLabel: string;
}

const OrganizationEditor: FC<OrganizationEditorProps> = ({ organization, submitHandler, submitLabel }) => {
	const [organizationObject, organizationObjectSet] = useState<CreateOrganizationRequest | Organization | undefined>(
		organization || undefined,
	);
	const [errorMessages, errorMessagesSet] = useState<ErrorMessages>(initialerrorMessages);
	const [postalCodePristine, postalCodePristineSet] = useState<boolean>(true);
	const [formValid, formValidSet] = useState<boolean>(true);

	useEffect(() => {
		// check for error messages and required fields
		const organizationName = organizationObject?.title?.de || "";
		if (
			organizationName.length > 0 &&
			Object.values(errorMessages)
				//exclude the general error from the check
				.filter((error) => error !== errorMessages.general)
				.reduce((acc, curr) => acc + curr, "").length === 0
		) {
			formValidSet(true);
			errorMessagesSet(initialerrorMessages);
		} else {
			formValidSet(false);
		}
	}, [organizationObject, errorMessages]);

	const onChange = (value: string, id: string /* e: React.ChangeEvent<HTMLInputElement> */) => {
		const newOrganization = { ...organizationObject };
		_.set(newOrganization, id, value);
		organizationObjectSet(newOrganization as CreateOrganizationRequest);
		if (id === "address.postalCode") {
			const errorMessage = validatePostalCode(value);
			errorMessagesSet((prev) => ({ ...prev, postalCode: errorMessage }));
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValid) {
			submitHandler(e, organizationObject as CreateOrganizationRequest);
		} else {
			errorMessagesSet((prev) => ({
				...prev,
				general: "Bitte alle Pflichtfelder korrekt ausfüllen",
			}));
		}
	};

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<Input
				type="text"
				id="title.de"
				initialValue={organizationObject?.title?.de || ""}
				label={"Name (Pflichtfeld)"}
				required
				placeholder={"Hier bitte Name eingeben … "}
				onChange={onChange}
			/>
			<Input
				type="text"
				id="description.de"
				initialValue={organizationObject?.description?.de || ""}
				label={"Beschreibung"}
				placeholder={"Hier bitte Beschreibung eingeben … "}
				onChange={onChange}
			/>
			<Input
				type="text"
				id="address.postalCode"
				initialValue={organizationObject?.address?.postalCode || ""}
				label={"Postleitzahl"}
				placeholder={"Hier bitte PLZ eingeben … "}
				onChange={onChange}
				setPristine={postalCodePristineSet}
				errorMessage={
					!postalCodePristine && organizationObject?.address?.postalCode ? errorMessages.postalCode : undefined
				}
			/>
			<Input
				type="text"
				id="address.addressLocality"
				initialValue={organizationObject?.address?.addressLocality || ""}
				label={"Ort"}
				placeholder={"Hier bitte den Ort eingeben … "}
				onChange={onChange}
			/>
			<Button type="submit">{submitLabel}</Button>
			{errorMessages.general && <span aria-live="assertive">{errorMessages.general}</span>}
		</form>
	);
};

export default OrganizationEditor;
