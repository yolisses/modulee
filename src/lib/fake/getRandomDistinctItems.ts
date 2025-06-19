export function getRandomDistinctItems<T>(items: T[], count: number) {
	if (count > items.length) {
		throw new Error('Count cannot be greater than the number of items.');
	}

	const result: T[] = [];
	const usedIndices = new Set<number>();
	while (result.length < count) {
		const idx = Math.floor(Math.random() * items.length);
		if (!usedIndices.has(idx)) {
			usedIndices.add(idx);
			result.push(items[idx]);
		}
	}
	return result;
}
