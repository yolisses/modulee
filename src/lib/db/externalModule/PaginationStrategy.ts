// Strategy Interface
export abstract class PaginationStrategy<T = unknown> {
	abstract getNextCursor(lastItem: any): T;
	abstract getSort(): Record<string, 1 | -1>;
	abstract getFilter(cursorData: T): Record<string, any>;

	getProjection() {
		return {};
	}

	getNextCursorString(lastItem: any): string {
		return JSON.stringify(this.getNextCursor(lastItem));
	}
}
