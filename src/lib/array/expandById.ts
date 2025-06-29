import { findById } from './findById';
import type { HasId } from './HasId';

export function expandById<T extends HasId>(items: T[], ids: string[]) {
	return ids.map((id) => {
		return findById(items, id);
	});
}
