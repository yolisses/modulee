import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string };

export class DefaultSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { _id: -1 } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return { _id: { $lte: cursorData._id } };
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return { _id: lastItem._id };
	}
}
