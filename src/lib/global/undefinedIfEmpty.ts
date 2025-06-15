export function undefinedIfEmpty(value: string) {
	if (!value) return undefined;
	return value;
}
