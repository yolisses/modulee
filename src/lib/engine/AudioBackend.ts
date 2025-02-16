import type { GroupEngineData } from './data/GroupEngineData';

export interface AudioBackend {
	destroy(): void;
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	// TODO remove once setGraph is implemented
	setMainGroupId(mainGroupId: string): void;
	// TODO replace by setGraph
	setGroups(groupsEngineData: GroupEngineData[]): void;
}
