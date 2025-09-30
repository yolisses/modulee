import type { GraphEngineData } from './data/GraphEngineData';

export interface AudioBackend {
	// TODO pass velocity data too
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	setIsMuted(isMuted: boolean): void;
	updateControl(id: number, value: number): void;
	setGraph(graphEngineData: GraphEngineData): void;
}
