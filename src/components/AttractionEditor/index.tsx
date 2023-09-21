import apiClient from "@api/client";
import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import { Button } from "../Button";
import { InputField } from "../InputFieldV2";
import Spacer from "../Spacer";
import { getInitialRequest } from "./service";

interface Props {
	attraction: AdminAttraction | null;
}

export default function AttractionEditor(props: Props) {
	const { attraction } = props;
	const isNew = attraction === null;
	const t = useTranslations("Attraction-Details");
	const submitLabel = t(isNew ? "save-button-add" : "save-button-edit");
	// TODO: Offer more languages.
	const languages = ["de"];
	const currentLanguage = languages[0];
	const [attractionRequest, setAttractionRequest] = useState(getInitialRequest(attraction, languages));
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			if (isNew) {
				await apiClient.maintainCulturalData.postAttractions(attractionRequest);
				return;
			}
			await apiClient.maintainCulturalData.patchAttractions(attraction.identifier, attractionRequest);
			// TODO: Do something after saving.
		},
		[attraction?.identifier, attractionRequest, isNew],
	);
	return (
		<form onSubmit={handleSubmit}>
			<InputField
				label={t("label-title")}
				id={`title.${currentLanguage}`}
				value={attractionRequest.title[currentLanguage]}
				onChange={(event) => {
					setAttractionRequest((prev) => ({
						...prev,
						title: {
							...prev.title,
							[currentLanguage]: event.target.value,
						},
					}));
				}}
				required={true}
			/>
			<Spacer size={10} />
			<InputField
				label={t("label-description")}
				id={`description.${currentLanguage}`}
				value={attractionRequest.description![currentLanguage]}
				onChange={(event) => {
					setAttractionRequest((prev) => ({
						...prev,
						description: {
							...prev.description,
							[currentLanguage]: event.target.value,
						},
					}));
				}}
				required={true}
			/>
			<Spacer size={20} />
			<Button type="submit">{submitLabel}</Button>
		</form>
	);
}
