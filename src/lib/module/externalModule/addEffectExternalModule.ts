import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { SetExternalModuleReferenceCommand } from '$lib/commands/externalModule/SetExternalModuleReferenceCommand';
import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createId } from '$lib/data/createId';
import type { Graph } from '$lib/data/Graph.svelte';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { ExternalModuleData } from './ExternalModuleData';

// TODO improve this function after usability tests
// TODO consider linting the graph
export function addEffectExternalModule(
	graph: Graph,
	editor: Editor,
	projectId: string,
	internalModuleId: string,
	externalModuleData: ExternalModuleData,
) {
	const setExternalModuleReferenceCommand = new SetExternalModuleReferenceCommand({
		projectId,
		id: createId(),
		createdAt: new Date().toJSON(),
		type: 'SetExternalModuleReferenceCommand',
		details: {
			externalModuleReference: {
				type: 'external',
				id: externalModuleData.id,
				version: externalModuleData.version,
			},
		},
	});
	editor.execute(setExternalModuleReferenceCommand);

	const outputNode = graph.nodes.values().find((node) => node.type === 'OutputNode');

	const moduleNodeId = createId();
	const addNodeCommand = new AddNodeCommand({
		projectId,
		id: moduleNodeId,
		type: 'AddNodeCommand',
		createdAt: new Date().toJSON(),
		details: {
			node: {
				id: createId(),
				internalModuleId,
				type: 'ModuleNode',
				unconnectedInputValues: {},
				position: outputNode?.position ?? { x: 0, y: 0 },
				extras: {
					moduleReference: {
						type: 'external',
						id: externalModuleData.id,
						version: externalModuleData.version,
					},
				},
			},
		},
	});
	editor.execute(addNodeCommand);

	if (!outputNode) return;
	const setConnectionCommand = new SetConnectionCommand({
		projectId,
		id: createId(),
		type: 'SetConnectionCommand',
		createdAt: new Date().toJSON(),
		details: {
			connection: {
				id: createId(),
				targetNodeId: moduleNodeId,
				inputPath: { inputKey: 'input', nodeId: outputNode?.id },
			},
		},
	});
	editor.execute(setConnectionCommand);
}
