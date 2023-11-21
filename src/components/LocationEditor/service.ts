import { Location } from "@api/client/models/Location";
import { CreateLocationRequest } from "@api/client/models/CreateLocationRequest";
import { createLanguagesObject } from "@utils/content";

export function getInitialRequest(location: Location | null, languages: Array<string>): CreateLocationRequest {
	return {
		title: createLanguagesObject(languages, location?.title),
		description: createLanguagesObject(languages, location?.description),
		website: location?.website ?? "",
		inLanguages: languages,
		tags: location?.tags || [],
		externalLinks: location?.externalLinks || [],
		address: location?.address || {},
		isVirtual: location?.isVirtual || false,
	};
}
