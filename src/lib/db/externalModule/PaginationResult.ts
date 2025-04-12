export type PaginationResult<T> = {
	items: T[];
	nextCursor: string | null;
};
