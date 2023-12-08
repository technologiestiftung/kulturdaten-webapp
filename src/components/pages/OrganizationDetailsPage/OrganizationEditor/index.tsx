import { Organization } from "@api/client/models/Organization";
import { Borough, Tag } from "@common/types";
import AddressFormFields from "@components/AddressFormFields";
import ContactFormFields from "@components/ContactFormFields";
import FormField from "@components/FormField";
import Input from "@components/Input";
import Spacer from "@components/Spacer";
import TagEditor from "@components/TagEditor";
import Textarea from "@components/Textarea";
import useApiClient from "@hooks/useApiClient";
import { StatusUpdate } from "@services/organizations";
import { showErrorToast, showSuccessToast } from "@services/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";
import Buttons from "./Buttons";
import { getInitialRequest } from "./service";

interface Props {
	organization: Organization | null;
	tags: Tag[];
	onAfterSubmit(): void;
}

export default function OrganizationEditor(props: Props) {
	const { organization, tags, onAfterSubmit } = props;
	const router = useRouter();
	const isNew = organization === null;
	const t = useTranslations("Organization-Details");
	const submitLabel = t(isNew ? "save-button-add" : "save-button-edit");
	// TODO: Offer more languages.
	const languages = ["de"];
	const currentLanguage = languages[0];
	const [organizationRequest, setOrganizationRequest] = useState(getInitialRequest(organization, languages));
	const apiClient = useApiClient();
	const handleUpdatedStatus = useCallback(
		(newStatus: StatusUpdate) => {
			router.replace(router.asPath, undefined, { scroll: false });
			const toastMessages: Record<StatusUpdate, string> = {
				archive: t("status-updated-archive"),
				unarchive: t("status-updated-unarchive"),
				publish: t("status-updated-publish"),
				unpublish: t("status-updated-unpublish"),
			};
			showSuccessToast(toastMessages[newStatus]);
		},
		[router, t],
	);
	const handleSubmit = useCallback<FormEventHandler>(
		async (event) => {
			event.preventDefault();
			try {
				if (isNew) {
					await apiClient.manageCulturalData.postOrganizations(organizationRequest);
				} else {
					await apiClient.manageCulturalData.patchOrganizations(organization.identifier, organizationRequest);
				}
				showSuccessToast(t("save-success"));
				onAfterSubmit();
			} catch (error) {
				showErrorToast(t("save-error"));
			}
		},
		[apiClient, organization?.identifier, organizationRequest, isNew, onAfterSubmit, t],
	);

	return (
		<form onSubmit={handleSubmit}>
			<FormField
				component={Input}
				label={t("label-title")}
				id={`title.${currentLanguage}`}
				value={organizationRequest.title[currentLanguage]}
				onChange={(event) => {
					setOrganizationRequest((prev) => ({
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
				value={organizationRequest.description![currentLanguage]}
				onChange={(event) => {
					setOrganizationRequest((prev) => ({
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
				value={organizationRequest.website}
				onChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						website: event.target.value,
					}));
				}}
				required={false}
			/>
			<Spacer size={30} />
			<AddressFormFields
				streetAddress={organizationRequest.address?.streetAddress}
				addressLocality={organizationRequest.address?.addressLocality}
				postalCode={organizationRequest.address?.postalCode}
				borough={organizationRequest.borough}
				description={organizationRequest.address?.description}
				onStreetAddressChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						address: {
							...prev.address,
							streetAddress: event.target.value,
						},
					}));
				}}
				onAddressLocalityChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						address: {
							...prev.address,
							addressLocality: event.target.value,
						},
					}));
				}}
				onPostalCodeChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						address: {
							...prev.address,
							postalCode: event.target.value,
						},
					}));
				}}
				onBoroughChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						borough: event.target.value as Borough | undefined,
					}));
				}}
				onDescriptionChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						address: {
							...prev.address,
							description: event.target.value,
						},
					}));
				}}
			/>
			<Spacer size={30} />
			<ContactFormFields
				name={organizationRequest.contact?.name}
				email={organizationRequest.contact?.email}
				telephone={organizationRequest.contact?.telephone}
				onNameChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							name: event.target.value,
						},
					}));
				}}
				onEmailChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							email: event.target.value,
						},
					}));
				}}
				onTelephoneChange={(event) => {
					setOrganizationRequest((prev) => ({
						...prev,
						contact: {
							...prev.contact,
							telephone: event.target.value,
						},
					}));
				}}
			/>
			<Spacer size={30} />
			<TagEditor
				tags={tags}
				selectedTagIdentifiers={organizationRequest.tags!}
				language={currentLanguage}
				onChange={(tags) =>
					setOrganizationRequest((prev) => ({
						...prev,
						tags,
					}))
				}
			/>
			<Spacer size={30} />
			<Buttons organization={organization} onUpdated={handleUpdatedStatus} submitLabel={submitLabel} />
		</form>
	);
}
