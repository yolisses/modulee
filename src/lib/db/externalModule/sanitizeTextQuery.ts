export function sanitizeTextQuery(textQuery: string) {
	return textQuery.replace(/[^\w\s]/gi, '');
}
