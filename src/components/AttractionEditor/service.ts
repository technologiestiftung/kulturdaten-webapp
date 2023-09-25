import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { CreateAttractionRequest } from "@api/client/models/CreateAttractionRequest";

function createLanguagesObject(languages: Array<string>) {
	return languages.reduce(
		(acc, lang) => {
			acc[lang] = "";
			return acc;
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
		title: createLanguagesObject(languages),
		displayName: createLanguagesObject(languages),
		description: createLanguagesObject(languages),
		pleaseNote: createLanguagesObject(languages),
		website: "",
		inLanguages: languages,
		tags: [],
		...attraction,
	};
}
