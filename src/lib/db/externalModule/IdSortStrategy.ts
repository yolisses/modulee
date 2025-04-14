import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Types } from 'mongoose';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string };

export class IdSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { $sort: { score: -1, _id: -1 } } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return { $match: { _id: { $lte: new Types.ObjectId(cursorData._id) } } };
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return { _id: lastItem._id };
	}
}
