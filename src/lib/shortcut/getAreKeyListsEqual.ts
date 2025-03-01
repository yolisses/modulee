export function getAreKeyListsEqual(keys1: string[], keys2: string[]) {
	if (keys1.length !== keys2.length) return false;
	return keys1.every((key1, index) => {
		const key2 = keys2[index];
		return key1 === key2;
	});
}
