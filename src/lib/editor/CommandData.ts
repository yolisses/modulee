import type { EmptyObject } from './EmptyObject';

export type CommandData<T = EmptyObject> = {
	id: string;
	details: T;
	type: string;
	projectId: string;
	createdAt: string;
};
