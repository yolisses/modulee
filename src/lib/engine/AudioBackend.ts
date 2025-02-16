import type { GraphEngineData } from './data/GraphEngineData';

export interface AudioBackend {
	destroy(): void;
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	setGraph(graphEngineData: GraphEngineData): void;
}
