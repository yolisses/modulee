import type { GraphEngineData } from './data/GraphEngineData';

export interface AudioBackend {
	destroy(): void;
	// TODO pass velocity data too
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	setIsMuted(isMuted: boolean): void;
	setGraph(graphEngineData: GraphEngineData): void;
}
