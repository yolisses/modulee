import type { HasName } from './HasName';

export function getName<T extends HasName>(value: T) {
	return value.name;
}
