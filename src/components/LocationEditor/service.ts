import { CreateLocationRequest } from "@api/client/models/CreateLocationRequest";
import { Location } from "@api/client/models/Location";
import { createLanguagesObject } from "@utils/content";

export function getInitialRequest(location: Location | null, languages: Array<string>): CreateLocationRequest {
	return {
		title: createLanguagesObject(languages, location?.title),
		description: createLanguagesObject(languages, location?.description),
		website: location?.website ?? "",
		inLanguages: languages,
		tags: location?.tags || [],
		externalLinks: location?.externalLinks || [],
		address: {
			streetAddress: location?.address?.streetAddress || "",
			addressLocality: location?.address?.addressLocality || "",
			postalCode: location?.address?.postalCode || "",
			description: location?.address?.description || "",
		},
		borough: location?.borough,
		isVirtual: location?.isVirtual || false,
	};
}
