export function getNewItemName(existingItems: { name: string }[], prefix: string): string {
	const regex = new RegExp(`^${prefix} (\\d+)$`);
	const itemNumbers = existingItems
		.map((existingItem) => {
			const match = existingItem.name.match(regex);
			return match ? parseInt(match[1]) : null;
		})
		.filter((num): num is number => num !== null);

	const nextNumber = itemNumbers.length > 0 ? Math.max(...itemNumbers) + 1 : 1;
	return `${prefix} ${nextNumber}`;
}
