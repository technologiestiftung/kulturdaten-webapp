export function getLocalizedLabel(labels: Record<string, string>) {
	const languages = ["de", "en"];
	const availableLanguage = languages.find((language) => labels[language]);
	if (!availableLanguage) {
		return "";
	}
	return labels[availableLanguage];
}
