export function getStringOrUndefined(data: FormData, key: string): string | undefined {
	const value = data.get(key);
	if (value === null) return undefined;

	if (typeof value === 'string') {
		return value;
	}
}
