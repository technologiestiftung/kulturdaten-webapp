import { createAuthorizedClient } from "@api/client";
import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { getAccessToken } from "@utils/auth";
import { useTranslations } from "next-intl";
import { FormEventHandler, useCallback, useState } from "react";
import { Button } from "../Button";
import { InputField } from "../InputFieldV2";
import Spacer from "../Spacer";
import { getInitialRequest } from "./service";

interface Props {
	attraction: AdminAttraction | null;
	onAfterSubmit(): void;
}

export default function AttractionEditor(props: Props) {
	const { attraction, onAfterSubmit } = props;
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
			const accessToken = getAccessToken();
			if (!accessToken) {
				// TODO: Show error message in UI.
				throw new Error("No access token found");
			}
			const apiClient = createAuthorizedClient(accessToken);
			if (isNew) {
				await apiClient.maintainCulturalData.postAttractions(attractionRequest);
				return;
			}
			await apiClient.maintainCulturalData.patchAttractions(attraction.identifier, attractionRequest);
			onAfterSubmit();
		},
		[attraction?.identifier, attractionRequest, isNew, onAfterSubmit],
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
