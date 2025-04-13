import { DefaultSortStrategy } from './DefaultSortStrategy';
import { LikeCountSortStrategy } from './LikeCountSortStrategy';
import type { PaginationStrategy } from './PaginationStrategy';
import { UpdatedAtSortStrategy } from './UpdatedAtSortStrategy';
import { UsageCountSortStrategy } from './UsageCountSortStrategy';

// Strategy Factory
export function getStrategy(sortOption?: string): PaginationStrategy {
	switch (sortOption) {
		case undefined:
			return new DefaultSortStrategy();
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
