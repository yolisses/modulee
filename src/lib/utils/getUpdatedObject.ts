export function getUpdatedObject<T extends object>(old: T, partial: Partial<T>) {
	Object.entries(old).forEach(([key]) => {
		if (partial[key] !== undefined) {
			old[key] = partial[key];
		}
	});
}
