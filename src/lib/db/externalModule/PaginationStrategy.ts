import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { PipelineStage } from 'mongoose';
import type { HasId } from './HasId';

// Strategy Interface
export abstract class PaginationStrategy<T = unknown> {
	abstract getSortStage(): PipelineStage;
	abstract getFilterStage(cursorData: T): PipelineStage;
	abstract getNextCursor(lastItem: HasId & ExternalModuleData): T;

	getNextCursorString(lastItem: HasId & ExternalModuleData): string {
		return JSON.stringify(this.getNextCursor(lastItem));
	}
}
