import { Location } from "@api/client/models/Location";
import useApiClient from "@hooks/useApiClient";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";
import FormField from "../FormField";
import Input from "../Input";
import Spacer from "../Spacer";
import Textarea from "../Textarea";
import Buttons from "./Buttons";
import { getInitialRequest } from "./service";

interface Props {
	location: Location | null;
	onAfterSubmit(): void;
}

export default function LocationEditor(props: Props) {
	const { location, onAfterSubmit } = props;
	const router = useRouter();
	const isNew = location === null;
	const t = useTranslations("Location-Details");
	const submitLabel = t(isNew ? "save-button-add" : "save-button-edit");
	// TODO: Offer more languages.
	const languages = ["de"];
	const currentLanguage = languages[0];
	const [locationRequest, setLocationRequest] = useState(getInitialRequest(location, languages));
	const apiClient = useApiClient();
	const handleUpdatedStatus = useCallback(() => {
		router.replace(router.asPath, undefined, { scroll: false });
		// TODO: Show success message.
	}, [router]);
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			if (isNew) {
				await apiClient.manageCulturalData.postLocations(locationRequest);
			} else {
				await apiClient.manageCulturalData.patchLocations(location.identifier, locationRequest);
			}
			onAfterSubmit();
		},
		[apiClient, location?.identifier, locationRequest, isNew, onAfterSubmit],
	);

	return (
		<form onSubmit={handleSubmit}>
			<FormField
				component={Input}
				label={t("label-title")}
				id={`title.${currentLanguage}`}
				value={locationRequest.title[currentLanguage]}
				onChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						title: {
							...prev.title,
							[currentLanguage]: event.target.value,
						},
					}));
				}}
				required={true}
			/>
			<Spacer size={15} />
			<FormField
				component={Textarea}
				label={t("label-description")}
				id={`description.${currentLanguage}`}
				value={locationRequest.description![currentLanguage]}
				onChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						description: {
							...prev.description,
							[currentLanguage]: event.target.value,
						},
					}));
				}}
				rows={8}
				required={true}
			/>
			<Spacer size={20} />
			<Buttons location={location} onUpdated={handleUpdatedStatus} submitLabel={submitLabel} />
		</form>
	);
}

