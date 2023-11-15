export function getLocalizedLabel(labels: Record<string, string>) {
	const languages = ["de", "en"];
	const availableLanguage = languages.find((language) => labels[language]);
	if (!availableLanguage) {
		return "";
	}
	return labels[availableLanguage];
}

export function createLanguagesObject(languages: Array<string>, existingValues: Record<string, string> | undefined) {
	return languages.reduce(
		(result, lang) => {
			result[lang] = existingValues?.[lang] ?? "";
			return result;
		},
		{} as Record<string, string>,
	);
}