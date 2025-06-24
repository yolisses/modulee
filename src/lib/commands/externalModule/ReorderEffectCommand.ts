import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { AudioInputNodeData } from '$lib/data/variants/AudioInputNodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { SomeModuleNodeData } from '$lib/rack/SomeModuleNodeData';

function getInternalModuleAudioInputNodes(
	internalModuleData: InternalModuleData,
	graphRegistry: GraphRegistry,
) {
	return graphRegistry.nodes
		.values()
		.filter(getIsAudioInputNodeData)
		.filter((nodeData) => {
			return nodeData.internalModuleId === internalModuleData.id;
		});
}

function getExternalModuleAudioInputNodes(externalModuleData: ExternalModuleData) {
	const { graph } = externalModuleData;
	return graph.nodes.filter(getIsAudioInputNodeData).filter((nodeData) => {
		return nodeData.internalModuleId === graph.mainInternalModuleId;
	});
}

function getAudioInputNodes(moduleNodeData: SomeModuleNodeData, graphRegistry: GraphRegistry) {
	const { moduleReference } = moduleNodeData.extras;
	if (!moduleReference) return;

	let audioInputNodes: AudioInputNodeData[];
	if (moduleReference.type === 'internal') {
		const internalModuleData = graphRegistry.internalModules.get(moduleReference.id);
		audioInputNodes = getInternalModuleAudioInputNodes(internalModuleData, graphRegistry);
	} else {
		const externalModuleData = graphRegistry.externalModules.get(moduleReference.id);
		audioInputNodes = getExternalModuleAudioInputNodes(externalModuleData);
	}

	const externalModuleData = graphRegistry.externalModules.get(moduleReference.id);
	const audioInputNodeData = externalModuleData.graph.nodes.find(getIsAudioInputNodeData);
	return audioInputNodeData;
}

function getAudioInputTargetNodeId(
	moduleNodeData: SomeModuleNodeData,
	graphRegistry: GraphRegistry,
) {
	const audioInputNodeData = getAudioInputNodes(moduleNodeData, graphRegistry);
	if (!audioInputNodeData) return;

	const connection = graphRegistry.connections.values().find((connectionData) => {
		const { inputKey, nodeId } = connectionData.inputPath;
		return inputKey === audioInputNodeData.id && nodeId === moduleNodeData.id;
	});
	if (!connection) return;

	return connection.targetNodeId;
}

export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
}> {
	execute(graphRegistry: GraphRegistry): void {}

	undo(graphRegistry: GraphRegistry): void {
		throw new Error('Method not implemented.');
	}
}
