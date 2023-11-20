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
		address: organization?.address || {},
		borough: organization?.borough,
		coordinates: organization?.coordinates,
		contact: organization?.contact,
	};
}
