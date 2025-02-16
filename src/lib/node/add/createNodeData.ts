import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import type { Vector } from 'nodes-editor';
import type { NodeType } from './NodeType';

export function createNodeData(nodeType: NodeType, groupId: string, position: Vector): NodeData {
	// TODO find a more secure way to type this result
	return {
		groupId,
		position,
		id: createId(),
		type: nodeType.name,
		extras: structuredClone(nodeType.defaultExtras),
	} as unknown as NodeData;
}
