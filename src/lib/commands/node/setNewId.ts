import type { HasId } from '$lib/array/HasId';
import { createId } from '$lib/data/createId';

export function setNewId<T extends HasId>(value: T) {
	value.id = createId();
}
