import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; likeCount: number };

export class LikeCountSortStrategy extends PaginationStrategy {
	getSort() {
		return { likeCount: -1, _id: -1 } as const;
	}

	getFilter(cursorData: CursorData) {
		if (!cursorData) return {};
		return {
			$or: [
				{ likeCount: { $lt: cursorData.likeCount } },
				{ likeCount: cursorData.likeCount, _id: { $lte: cursorData._id } },
			],
		};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return {
			_id: lastItem._id,
			likeCount: lastItem.likeCount,
		};
	}
}
