import { CreateOrganizationRequest } from "@api/client/models/CreateOrganizationRequest";
import { Organization } from "@api/client/models/Organization";
import { createLanguagesObject } from "@utils/content";

export function getInitialRequest(
	organization: Organization | null,
	languages: Array<string>,
): CreateOrganizationRequest {
	return {
		title: createLanguagesObject(languages, organization?.title),
		description: createLanguagesObject(languages, organization?.description),
		website: organization?.website ?? "",
		inLanguages: languages,
		tags: organization?.tags || [],
		address: {
			streetAddress: organization?.address?.streetAddress || "",
			addressLocality: organization?.address?.addressLocality || "",
			postalCode: organization?.address?.postalCode || "",
			description: organization?.address?.description || "",
		},
		borough: organization?.borough,
		coordinates: organization?.coordinates,
		contact: {
			name: organization?.contact?.name || "",
			email: organization?.contact?.email || "",
			telephone: organization?.contact?.telephone || "",
		},
	};
}
