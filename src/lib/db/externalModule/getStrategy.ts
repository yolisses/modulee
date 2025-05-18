// TODO
abstract class PaginationStrategy {}
class TextScoreSortStrategy extends PaginationStrategy {
	constructor(public text: string) {
		super();
	}
}
class LikeCountSortStrategy extends PaginationStrategy {}
class UpdatedAtSortStrategy extends PaginationStrategy {}
class UsageCountSortStrategy extends PaginationStrategy {}

// Strategy Factory
export function getStrategy(sortOption?: string, text?: string): PaginationStrategy {
	switch (sortOption) {
		case undefined:
			if (text) {
				return new TextScoreSortStrategy(text);
			} else {
				return new LikeCountSortStrategy();
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
