import type { HasId } from '$lib/array/HasId';

export function getId<T extends HasId>(value: T) {
	return value.id;
}
