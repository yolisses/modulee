export function getUpdatedObject<T extends object>(old: T, partial: Partial<T>) {
	Object.keys(old).forEach((key) => {
		const typedKey = key as keyof T;
		if (partial[typedKey] !== undefined) {
			old[typedKey] = partial[typedKey] as T[keyof T];
		}
	});
}
