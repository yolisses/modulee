import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { PipelineStage } from 'mongoose';

// Strategy Interface
export abstract class PaginationStrategy<T = unknown> {
	abstract getSortStage(): PipelineStage;
	abstract getFilterStage(cursorData: T): PipelineStage;
	abstract getNextCursor(lastItem: ExternalModuleData): T;

	getNextCursorString(lastItem: ExternalModuleData): string {
		return JSON.stringify(this.getNextCursor(lastItem));
	}
}
