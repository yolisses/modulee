import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Types } from 'mongoose';
import type { Has_Id } from './Has_Id';
import type { HasScore } from './HasScore';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; score: number };

export class TextScoreSortStrategy extends PaginationStrategy {
	constructor(public text: string) {
		super();
	}

	getProjection() {
		return { score: { $meta: 'textScore' } } as const;
	}

	getSortStage() {
		return { $sort: { score: -1, _id: -1 } } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return {
			$match: {
				$or: [
					{ score: { $lt: cursorData.score } },
					{ score: cursorData.score, _id: { $lte: new Types.ObjectId(cursorData._id) } },
				],
			},
		};
	}

	getNextCursor(lastItem: ExternalModuleData & Has_Id & HasScore): CursorData {
		return {
			_id: lastItem._id.toString(),
			score: lastItem.score,
		};
	}
}
