import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { PipelineStage } from 'mongoose';
import type { Has_Id } from './Has_Id';

// Strategy Interface
export abstract class PaginationStrategy<T = unknown> {
	abstract getSortStage(): PipelineStage;
	abstract getFilterStage(cursorData: T): PipelineStage;
	abstract getNextCursor(lastItem: Has_Id & ExternalModuleData): T;

	getNextCursorString(lastItem: Has_Id & ExternalModuleData): string {
		return JSON.stringify(this.getNextCursor(lastItem));
	}
}
