import type { NodeEngineData } from './NodeEngineData';

export interface AudioBackend {
	setNodes(nodesEngineData: NodeEngineData[]): void;
	destroy(): void;
}
