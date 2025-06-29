import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import { createNodeData } from '$lib/node/add/createNodeData';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { faker } from '@faker-js/faker';
import { createFakePosition } from './createFakePosition';
import { getRandomItem } from './getRandomItem';
import { randomRange } from './randomRange';

export function createFakeEffectGraph(): GraphData {
	const internalModulesData: InternalModuleData[] = randomRange(1, 3).map(() => {
		return { id: createId(), name: faker.word.noun() };
	});

	const mainInternalModule = getRandomItem(internalModulesData);
	// just to make easy to developers
	mainInternalModule.name = 'Main internal module';

	const nodesData: NodeData[] = randomRange(3, 20).map(() => {
		const position = createFakePosition();
		const nodeDefinition = getRandomItem(nodeDefinitions);
		const internalModuleId = getRandomItem(internalModulesData).id;
		return createNodeData(nodeDefinition, internalModuleId, position);
	});

	if (faker.datatype.boolean(0.8)) {
		const audioInputNodeDefinition = nodeDefinitions.find(
			(nodeDefinition) => nodeDefinition.type === 'AudioInputNode',
		);

		if (!audioInputNodeDefinition) {
			throw new Error('Missing audio input node definition');
		}

		const nodeData = createNodeData(
			audioInputNodeDefinition,
			mainInternalModule.id,
			createFakePosition(),
		);
		nodesData.push(nodeData);
	}

	internalModulesData.forEach((internalModulesData) => {
		if (faker.datatype.boolean(0.8)) {
			const audioInputNodeDefinition = nodeDefinitions.find(
				(nodeDefinition) => nodeDefinition.type === 'OutputNode',
			);

			if (!audioInputNodeDefinition) {
				throw new Error('Missing output node definition');
			}

			const nodeData = createNodeData(
				audioInputNodeDefinition,
				internalModulesData.id,
				createFakePosition(),
			);
			nodesData.push(nodeData);
		}
	});

	const connections: ConnectionData[] = randomRange(0, 2 * nodesData.length).map(() => {
		const originNode = getRandomItem(nodesData);
		const inputKey = getRandomItem(Object.keys(originNode.unconnectedInputValues));
		return {
			id: createId(),
			targetNodeId: getRandomItem(nodesData).id,
			inputPath: { nodeId: originNode.id, inputKey },
		};
	});

	return {
		connections,
		nodes: nodesData,
		internalModules: internalModulesData,
		mainInternalModuleId: mainInternalModule.id,
	};
}
