import type { GroupEngineData } from './GroupEngineData';

export interface AudioBackend {
	destroy(): void;
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	setGroups(groupsEngineData: GroupEngineData[]): void;
}
