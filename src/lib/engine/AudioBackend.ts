import type { NodeEngineData } from './NodeEngineData';

export interface AudioBackend {
	destroy(): void;
	setNoteOn(pitch: number): void;
	setNoteOff(pitch: number): void;
	setNodes(nodesEngineData: NodeEngineData[]): void;
}
