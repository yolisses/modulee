import type { Node } from 'modulee-nodes-editor';
import { getNodesEngineData } from './getNodesEngineData';

export function handleGraphChange(nodes: Node[]) {
	const nodesEngineData = getNodesEngineData(nodes);
	window.__JUCE__.backend.emitEvent('graphChange', { nodesData: JSON.stringify(nodesEngineData) });
}
