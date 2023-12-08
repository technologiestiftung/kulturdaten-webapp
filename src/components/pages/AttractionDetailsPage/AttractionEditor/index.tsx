import { AdminAttraction } from "@api/client/models/AdminAttraction";
import FormField from "@components/FormField";
import Input from "@components/Input";
import Spacer from "@components/Spacer";
import Textarea from "@components/Textarea";
import useApiClient from "@hooks/useApiClient";
import { StatusUpdate } from "@services/attractions";
import { showErrorToast, showSuccessToast } from "@services/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";
import Buttons from "./Buttons";
import { getInitialRequest } from "./service";

interface Props {
	attraction: AdminAttraction | null;
	onAfterSubmit(): void;
}

export default function AttractionEditor(props: Props) {
	const { attraction, onAfterSubmit } = props;
	const router = useRouter();
	const isNew = attraction === null;
	const t = useTranslations("Attraction-Details");
	const submitLabel = t(isNew ? "save-button-add" : "save-button-edit");
	// TODO: Offer more languages.
	const languages = ["de"];
	const currentLanguage = languages[0];
	const [attractionRequest, setAttractionRequest] = useState(getInitialRequest(attraction, languages));
	const apiClient = useApiClient();
	const handleUpdateStatus = async (newStatus: StatusUpdate) => {
		try {
			switch (newStatus) {
				case "archive":
					await apiClient.manageCulturalData.postAttractionsArchive(attraction!.identifier);
					showSuccessToast(t("status-updated-archive"));
					break;
				case "unarchive":
					await apiClient.manageCulturalData.postAttractionsUnarchive(attraction!.identifier);
					showSuccessToast(t("status-updated-unarchive"));
					break;
				case "publish":
					await apiClient.manageCulturalData.postAttractionsPublish(attraction!.identifier);
					showSuccessToast(t("status-updated-publish"));
					break;
				case "unpublish":
					await apiClient.manageCulturalData.postAttractionsUnpublish(attraction!.identifier);
					showSuccessToast(t("status-updated-unpublish"));
					break;
			}
			router.replace(router.asPath, undefined, { scroll: false });
		} catch (error) {
			showErrorToast(t("status-updated-error"));
		}
	};
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			try {
				if (isNew) {
					await apiClient.manageCulturalData.postAttractions(attractionRequest);
				} else {
					await apiClient.manageCulturalData.patchAttractions(attraction.identifier, attractionRequest);
				}
				showSuccessToast(t("save-success"));
				onAfterSubmit();
			} catch (error) {
				showErrorToast(t("save-error"));
			}
		},
		[apiClient, attraction?.identifier, attractionRequest, isNew, onAfterSubmit, t],
	);
	return (
		<form onSubmit={handleSubmit}>
			<FormField
				component={Input}
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
			<Spacer size={15} />
			<FormField
				component={Textarea}
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
				rows={8}
				required={true}
			/>
			<Spacer size={15} />
			<FormField
				component={Textarea}
				label={t("label-please-note")}
				id={`please-note.${currentLanguage}`}
				value={attractionRequest.pleaseNote![currentLanguage]}
				onChange={(event) => {
					setAttractionRequest((prev) => ({
						...prev,
						pleaseNote: {
							...prev.pleaseNote,
							[currentLanguage]: event.target.value,
						},
					}));
				}}
				rows={4}
				required={false}
			/>
			<Spacer size={15} />
			<FormField
				component={Input}
				type="url"
				label={t("label-website")}
				placeholder="https://example.com"
				id="website"
				value={attractionRequest.website}
				onChange={(event) => {
					setAttractionRequest((prev) => ({
						...prev,
						website: event.target.value,
					}));
				}}
				required={false}
			/>
			<Spacer size={20} />
			<Buttons attraction={attraction} onUpdateStatus={handleUpdateStatus} submitLabel={submitLabel} />
		</form>
	);
}
