import type { EmptyObject } from './EmptyObject';

export type CommandData<T = EmptyObject> = {
	id: string;
	type: string;
	details: T;
};
