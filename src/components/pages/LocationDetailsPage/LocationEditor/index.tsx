import { Location } from "@api/client/models/Location";
import { Borough } from "@common/types";
import AddressFormFields from "@components/AddressFormFields";
import Checkbox from "@components/Checkbox";
import ContactFormFields from "@components/ContactFormFields";
import FormField from "@components/FormField";
import Input from "@components/Input";
import Spacer from "@components/Spacer";
import Textarea from "@components/Textarea";
import useApiClient from "@hooks/useApiClient";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";
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
			<Spacer size={15} />
			<FormField
				component={Input}
				type="url"
				label={t("label-website")}
				placeholder="https://example.com"
				id="website"
				value={locationRequest.website}
				onChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						website: event.target.value,
					}));
				}}
				required={false}
			/>
			<Spacer size={30} />
			<Checkbox
				label={t("label-isVirtual")}
				checked={locationRequest.isVirtual}
				onChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						isVirtual: event.target.checked,
					}));
				}}
			/>

			{!locationRequest.isVirtual && (
				<>
					<Spacer size={15} />
					<AddressFormFields
						streetAddress={locationRequest.address?.streetAddress}
						addressLocality={locationRequest.address?.addressLocality}
						postalCode={locationRequest.address?.postalCode}
						borough={locationRequest.borough}
						description={locationRequest.address?.description}
						onStreetAddressChange={(event) => {
							setLocationRequest((prev) => ({
								...prev,
								address: {
									...prev.address,
									streetAddress: event.target.value,
								},
							}));
						}}
						onAddressLocalityChange={(event) => {
							setLocationRequest((prev) => ({
								...prev,
								address: {
									...prev.address,
									addressLocality: event.target.value,
								},
							}));
						}}
						onPostalCodeChange={(event) => {
							setLocationRequest((prev) => ({
								...prev,
								address: {
									...prev.address,
									postalCode: event.target.value,
								},
							}));
						}}
						onBoroughChange={(event) => {
							setLocationRequest((prev) => ({
								...prev,
								borough: event.target.value as Borough | undefined,
							}));
						}}
						onDescriptionChange={(event) => {
							setLocationRequest((prev) => ({
								...prev,
								address: {
									...prev.address,
									description: event.target.value,
								},
							}));
						}}
					/>
				</>
			)}
			<Spacer size={30} />
			<ContactFormFields
				name={locationRequest.contact?.name}
				email={locationRequest.contact?.email}
				telephone={locationRequest.contact?.telephone}
				onNameChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							name: event.target.value,
						},
					}));
				}}
				onEmailChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							email: event.target.value,
						},
					}));
				}}
				onTelephoneChange={(event) => {
					setLocationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							telephone: event.target.value,
						},
					}));
				}}
			/>
			<Spacer size={30} />
			<Buttons location={location} onUpdated={handleUpdatedStatus} submitLabel={submitLabel} />
		</form>
	);
}
