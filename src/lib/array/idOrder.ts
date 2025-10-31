import type { HasId } from './HasId';

export function idOrder(a: HasId, b: HasId) {
	return a.id.localeCompare(b.id);
}
