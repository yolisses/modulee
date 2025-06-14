import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { NodeData } from '$lib/data/NodeData';
import type { ModuleVoicesNodeData } from '$lib/data/variants/ModuleVoicesNodeData';
import type { OutputNodeData } from '$lib/data/variants/OutputNodeData';
import type { TriangleNodeData } from '$lib/data/variants/TriangleNodeData';
import { nodeItemWidth } from '$lib/node/nodeItemWidth';
import type { ModuleType } from '$lib/project/ModuleType';

export function getGraphTemplate(moduleType: ModuleType): GraphData {
	const nodes: NodeData[] = [];
	const connections: ConnectionData[] = [];
	const internalModules: InternalModuleData[] = [];

	const mainInternalModule: InternalModuleData = {
		id: createId(),
		name: 'Main internal module',
	};
	internalModules.push(mainInternalModule);

	const outputNode: OutputNodeData = {
		extras: {},
		id: createId(),
		type: 'OutputNode',
		position: { x: 0, y: 0 },
		unconnectedInputValues: { input: 0 },
		internalModuleId: mainInternalModule.id,
	};
	nodes.push(outputNode);

	if (moduleType === 'instrument') {
		const voiceInternalModule: InternalModuleData = {
			id: createId(),
			name: 'Main internal module',
		};
		internalModules.push(voiceInternalModule);

		const triangleNode: TriangleNodeData = {
			extras: {},
			id: createId(),
			type: 'TriangleNode',
			unconnectedInputValues: { phase: 0 },
			position: { x: -nodeItemWidth, y: 0 },
			internalModuleId: voiceInternalModule.id,
		};
		nodes.push(triangleNode);

		const voiceOutputNode: OutputNodeData = {
			extras: {},
			id: createId(),
			type: 'OutputNode',
			position: { x: 0, y: 0 },
			unconnectedInputValues: { input: 0 },
			internalModuleId: voiceInternalModule.id,
		};
		nodes.push(voiceOutputNode);

		const voiceTriangleOutputConnection: ConnectionData = {
			id: createId(),
			targetNodeId: triangleNode.id,
			inputPath: { nodeId: voiceOutputNode.id, inputKey: 'input' },
		};
		connections.push(voiceTriangleOutputConnection);

		const modulesVoiceNode: ModuleVoicesNodeData = {
			id: createId(),
			type: 'ModuleVoicesNode',
			unconnectedInputValues: {},
			position: { x: -nodeItemWidth, y: 0 },
			internalModuleId: mainInternalModule.id,
			extras: { moduleReference: { type: 'internal', id: voiceInternalModule.id } },
		};
		nodes.push(modulesVoiceNode);
	}

	return {
		nodes,
		connections,
		internalModules,
		externalModuleReferences: [],
		mainInternalModuleId: mainInternalModule.id,
	};
}
