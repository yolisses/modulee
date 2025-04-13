import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; score: number };

export class TextScoreSortStrategy extends PaginationStrategy {
	constructor(public text: string) {
		super();
	}

	getProjection() {
		return { score: { $meta: 'textScore' } } as const;
	}

	getSort() {
		return { score: { $meta: 'textScore' }, _id: -1 } as const;
	}

	getFilter(cursorData: CursorData) {
		if (!cursorData) {
			return { $text: { $search: this.text } };
		}
		return {
			$text: { $search: this.text },
			$or: [
				{ score: { $lt: cursorData.score } },
				{ score: cursorData.score, _id: { $lte: cursorData._id } },
			],
		};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return {
			_id: lastItem._id,
			score: lastItem.score,
		};
	}
}
