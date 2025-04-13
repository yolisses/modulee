import { DefaultSortStrategy } from './DefaultSortStrategy';
import { LikeCountSortStrategy } from './LikeCountSortStrategy';
import type { PaginationStrategy } from './PaginationStrategy';
import { UpdatedAtSortStrategy } from './UpdatedAtSortStrategy';

// Strategy Factory
export function getStrategy(sortOption?: string): PaginationStrategy {
	switch (sortOption) {
		case 'likeCount':
			return new LikeCountSortStrategy();
		case 'updatedAt':
			return new UpdatedAtSortStrategy();
		case undefined:
			return new DefaultSortStrategy();
		default:
			throw new Error(`Invalid sorting option: ${sortOption}`);
	}
}
