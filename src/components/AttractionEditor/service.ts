import { createLanguagesObject } from "@/src/utils/content";
import { AdminAttraction } from "@api/client/models/AdminAttraction";
import { CreateAttractionRequest } from "@api/client/models/CreateAttractionRequest";

export function getInitialRequest(
	attraction: AdminAttraction | null,
	languages: Array<string>,
): CreateAttractionRequest {
	return {
		title: createLanguagesObject(languages, attraction?.title),
		description: createLanguagesObject(languages, attraction?.description),
		pleaseNote: createLanguagesObject(languages, attraction?.pleaseNote),
		website: attraction?.website ?? "",
		inLanguages: languages,
		tags: attraction?.tags || [],
		externalLinks: attraction?.externalLinks || [],
	};
}
