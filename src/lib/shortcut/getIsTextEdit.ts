export function getIsTextEdit(e: KeyboardEvent) {
	const targetTagName = (e.target as HTMLElement).tagName;

	if (targetTagName === 'TEXTAREA') return true;

	if (targetTagName === 'INPUT') {
		const input = e.target as HTMLInputElement;
		// Add more types if required
		return !(input.type === 'range');
	}

	return false;
}
