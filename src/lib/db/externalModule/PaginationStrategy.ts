// Strategy Interface
export abstract class PaginationStrategy<T = unknown> {
	abstract getNextCursor(lastItem: any): T;
	abstract getSortOptions(): Record<string, 1 | -1>;
	abstract getFilter(cursorData: T): Record<string, any>;

	getNextCursorString(lastItem: any): string {
		return JSON.stringify(this.getNextCursor(lastItem));
	}
}
