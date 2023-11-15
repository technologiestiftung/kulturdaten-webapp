import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

import FormField from "../FormField";
import Input from "../Input";
import Spacer from "../Spacer";
import { ChangeEventHandler } from "react";

const Legend = styled.legend({});

const Fieldset = styled.fieldset({
	border: "none",
	padding: 0,
});

interface Props {
	streetAddress?: string;
	addressLocality?: string;
	postalCode?: string;
	description?: string;
	onStreetAddressChange?: ChangeEventHandler<HTMLInputElement>;
	onAddressLocalityChange?: ChangeEventHandler<HTMLInputElement>;
	onPostalCodeChange?: ChangeEventHandler<HTMLInputElement>;
	onDescriptionChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function AddressFormFields({
	streetAddress,
	addressLocality,
	postalCode,
	description,
	onStreetAddressChange,
	onAddressLocalityChange,
	onPostalCodeChange,
	onDescriptionChange,
}: Props) {
	const t = useTranslations("Address-Details");

	return (
		<Fieldset>
			<Legend>{t("label-address")}</Legend>
			<Spacer size={5} />
			<FormField
				component={Input}
				label={t("label-streetAddress")}
				id={"streetAddress"}
				value={streetAddress}
				onChange={onStreetAddressChange}
				required={false}
			/>
			<Spacer size={15} />
			<FormField
				component={Input}
				label={t("label-postalCode")}
				id={"postalCode"}
				value={postalCode}
				onChange={onPostalCodeChange}
				required={false}
			/>
			<Spacer size={15} />
			<FormField
				component={Input}
				label={t("label-addressLocality")}
				id={"addressLocality"}
				value={addressLocality}
				onChange={onAddressLocalityChange}
				required={false}
			/>
			<Spacer size={15} />
			<FormField
				component={Input}
				label={t("label-description")}
				id={"description"}
				value={description}
				onChange={onDescriptionChange}
				required={false}
			/>
		</Fieldset>
	);
}
