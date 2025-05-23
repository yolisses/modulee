import { AddExternalModuleReferenceCommand } from '$lib/commands/externalModule/AddExternalModuleReferenceCommand';
import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createId } from '$lib/data/createId';
import type { Graph } from '$lib/data/Graph.svelte';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { ExternalModuleData } from './ExternalModuleData';

export function addEffectExternalModule(
	graph: Graph,
	editor: Editor,
	projectId: string,
	internalModuleId: string,
	externalModuleData: ExternalModuleData,
) {
	const outputNode = graph.nodes.values().find((node) => node.type === 'OutputNode');
	const input = outputNode?.inputs.filter((input) => input.key === 'input');

	const addExternalModuleReferenceCommand = new AddExternalModuleReferenceCommand({
		projectId,
		id: createId(),
		createdAt: new Date().toJSON(),
		type: 'AddExternalModuleReferenceCommand',
		details: {
			externalModuleReference: {
				type: 'external',
				id: externalModuleData.id,
				version: externalModuleData.version,
			},
		},
	});
	editor.execute(addExternalModuleReferenceCommand);

	const addNodeCommand = new AddNodeCommand({
		projectId,
		id: createId(),
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
}
