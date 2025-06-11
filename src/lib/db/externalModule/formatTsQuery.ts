// The problems faced were: the search was invalid for inputs with spaces or
// special characters.
export function formatTsQuery(text: string): string {
	// Split the input into words and handle phrases
	const words = text
		.trim()
		.split(/\s+/)
		.map((word) =>
			// Escape special characters and ensure valid tsquery tokens
			word.replace(/[!&|*():]/g, ''),
		);

	if (words.length === 0) {
		return '';
	}

	return words.join(' & ');
}
