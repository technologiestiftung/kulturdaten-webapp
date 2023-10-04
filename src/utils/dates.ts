export function formatDate(date: Date | string, locale: string, options?: Intl.DateTimeFormatOptions) {
	const dateObject = typeof date === "string" ? new Date(date) : date;
	const format = new Intl.DateTimeFormat(locale, options);
	return format.format(dateObject);
}
