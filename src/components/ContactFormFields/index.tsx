import FormField from "@components/FormField";
import FormFieldset from "@components/FormFieldset";
import FormLegend from "@components/FormLegend";
import Input from "@components/Input";
import Spacer from "@components/Spacer";
import { useTranslations } from "next-intl";
import { ChangeEventHandler } from "react";

interface Props {
	name?: string;
	email?: string;
	telephone?: string;
	onNameChange?: ChangeEventHandler<HTMLInputElement>;
	onEmailChange?: ChangeEventHandler<HTMLInputElement>;
	onTelephoneChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function ContactFormFields({
	name,
	email,
	telephone,
	onNameChange,
	onEmailChange,
	onTelephoneChange,
}: Props) {
	const t = useTranslations("Contact-Details");
	return (
		<FormFieldset>
			<FormLegend>{t("contact")}</FormLegend>
			<Spacer size={5} />
			<FormField component={Input} label={t("label-name")} value={name} onChange={onNameChange} required={false} />
			<Spacer size={15} />
			<FormField
				component={Input}
				type="email"
				label={t("label-email")}
				value={email}
				onChange={onEmailChange}
				required={false}
			/>
			<Spacer size={15} />
			<FormField
				component={Input}
				label={t("label-telephone")}
				value={telephone}
				onChange={onTelephoneChange}
				placeholder={t("placeholder-telephone")}
				required={false}
			/>
		</FormFieldset>
	);
}
