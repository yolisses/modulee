export function getEventKeys(e: KeyboardEvent) {
	const keys: string[] = [];

	if (e.ctrlKey) {
		keys.push('Ctrl');
	}

	if (e.shiftKey) {
		keys.push('Shift');
	}

	if (e.shiftKey) {
		keys.push('Alt');
	}

	const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
	keys.push(key);

	return keys;
}
