import type { HasType } from './HasType';

export function getType<T extends HasType>(value: T) {
	return value.type;
}
