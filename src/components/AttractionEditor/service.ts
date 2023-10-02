import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { CreateAttractionRequest } from "@api/client/models/CreateAttractionRequest";

function createLanguagesObject(languages: Array<string>, existingValues: Record<string, string> | undefined) {
	return languages.reduce(
		(result, lang) => {
			result[lang] = existingValues?.[lang] ?? "";
			return result;
		},
		{} as Record<string, string>,
	);
}

export function getInitialRequest(
	attraction: AdminAttraction | null,
	languages: Array<string>,
): CreateAttractionRequest {
	return {
		type: "type.Attraction",
		title: createLanguagesObject(languages, attraction?.title),
		displayName: createLanguagesObject(languages, attraction?.displayName),
		description: createLanguagesObject(languages, attraction?.description),
		pleaseNote: createLanguagesObject(languages, attraction?.pleaseNote),
		website: attraction?.website ?? "",
		inLanguages: languages,
		tags: attraction?.tags || [],
		externalLinks: attraction?.externalLinks || [],
	};
}
