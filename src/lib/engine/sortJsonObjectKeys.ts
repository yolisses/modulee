export function sortJsonObjectKeys(data: unknown): unknown {
	if (typeof data !== 'object' || data === null) {
		return data;
	}

	if (Array.isArray(data)) {
		return data.map(sortJsonObjectKeys);
	}

	const sortedKeys = Object.keys(data as { [key: string]: unknown }).sort();
	const result: { [key: string]: unknown } = {};

	for (const key of sortedKeys) {
		result[key] = sortJsonObjectKeys((data as { [key: string]: unknown })[key]);
	}

	return result;
}
