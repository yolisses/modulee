import { IdSortStrategy } from './IdSortStrategy';
import { LikeCountSortStrategy } from './LikeCountSortStrategy';
import type { PaginationStrategy } from './PaginationStrategy';
import { TextScoreSortStrategy } from './TextScoreSortStrategy';
import { UpdatedAtSortStrategy } from './UpdatedAtSortStrategy';
import { UsageCountSortStrategy } from './UsageCountSortStrategy';

// Strategy Factory
export function getStrategy(sortOption?: string, text?: string): PaginationStrategy {
	switch (sortOption) {
		case undefined:
			if (text) {
				return new TextScoreSortStrategy(text);
			} else {
				return new IdSortStrategy();
			}
		case 'likeCount':
			return new LikeCountSortStrategy();
		case 'updatedAt':
			return new UpdatedAtSortStrategy();
		case 'usageCount':
			return new UsageCountSortStrategy();
		default:
			throw new Error(`Invalid sorting option: ${sortOption}`);
	}
}
