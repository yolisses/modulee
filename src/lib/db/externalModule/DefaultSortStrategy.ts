import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string };

export class DefaultSortStrategy extends PaginationStrategy {
	getSortOptions() {
		return { _id: -1 } as const;
	}

	getFilter(cursorData: CursorData) {
		return cursorData ? { _id: { $lte: cursorData._id } } : {};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return { _id: lastItem._id };
	}
}
