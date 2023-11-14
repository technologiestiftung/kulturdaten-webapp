import { Location } from "@api/client/models/Location";
import { CreateLocationRequest } from "@api/client/models/CreateLocationRequest";

function createLanguagesObject(languages: Array<string>, existingValues: Record<string, string> | undefined) {
	return languages.reduce(
		(result, lang) => {
			result[lang] = existingValues?.[lang] ?? "";
			return result;
		},
		{} as Record<string, string>,
	);
}

// TODO: adapt to locations
export function getInitialRequest(location: Location | null, languages: Array<string>): CreateLocationRequest {
	return {
		title: createLanguagesObject(languages, location?.title),
		description: createLanguagesObject(languages, location?.description),
		website: location?.website ?? "",
		inLanguages: languages,
		tags: location?.tags || [],
		externalLinks: location?.externalLinks || [],
		address: location?.address || {},
	};
}
