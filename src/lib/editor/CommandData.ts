export type CommandData<T = unknown> = {
	id: string;
	details: T;
	type: string;
	projectId: string;
	createdAt: string;
};
