import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Types } from 'mongoose';
import type { Has_Id } from './Has_Id';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; usageCount: number };

export class UsageCountSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { $sort: { usageCount: -1, _id: -1 } } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return {
			$match: {
				$or: [
					{ usageCount: { $lt: cursorData.usageCount } },
					{ usageCount: cursorData.usageCount, _id: { $lte: new Types.ObjectId(cursorData._id) } },
				],
			},
		};
	}

	getNextCursor(lastItem: ExternalModuleData & Has_Id): CursorData {
		return {
			_id: lastItem._id.toString(),
			usageCount: lastItem.usageCount,
		};
	}
}
