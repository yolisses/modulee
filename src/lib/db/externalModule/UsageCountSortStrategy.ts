import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; usageCount: number };

export class UsageCountSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { usageCount: -1, _id: -1 } as const;
	}

	getFilterStage(cursorData: CursorData) {
		if (!cursorData) return {};
		return {
			$or: [
				{ usageCount: { $lt: cursorData.usageCount } },
				{ usageCount: cursorData.usageCount, _id: { $lte: cursorData._id } },
			],
		};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return {
			_id: lastItem._id,
			usageCount: lastItem.usageCount,
		};
	}
}
