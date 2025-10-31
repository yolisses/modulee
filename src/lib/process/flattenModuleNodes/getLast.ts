export function getLast<T>(items: T[]) {
	if (items.length <= 0) {
		throw new Error("Can't get last element of empty array");
	}
	return items[items.length - 1];
}
