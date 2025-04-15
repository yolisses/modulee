import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Types } from 'mongoose';
import type { HasId } from './HasId';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; updatedAt: string };

export class UpdatedAtSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { $sort: { updatedAt: -1, _id: -1 } } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return {
			$match: {
				$or: [
					{ updatedAt: { $lt: new Date(cursorData.updatedAt) } },
					{
						updatedAt: new Date(cursorData.updatedAt),
						_id: { $lte: new Types.ObjectId(cursorData._id) },
					},
				],
			},
		};
	}

	getNextCursor(lastItem: ExternalModuleData & HasId): CursorData {
		return {
			_id: lastItem._id.toString(),
			updatedAt: lastItem.updatedAt,
		};
	}
}
