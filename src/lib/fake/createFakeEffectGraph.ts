import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import { createNodeData } from '$lib/node/add/createNodeData';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { faker } from '@faker-js/faker';
import { getRandomInt } from './getRandomInt';
import { getRandomItem } from './getRandomItem';
import { randomRange } from './randomRange';

function createFakePosition(): VectorData {
	const value = 10;
	return {
		x: getRandomInt(-value, value),
		y: getRandomInt(-value, value),
	};
}

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
			(nodeDefinition) => nodeDefinition.name === 'AudioInputNode',
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
				(nodeDefinition) => nodeDefinition.name === 'OutputNode',
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
		externalModuleReferences: [],
		internalModules: internalModulesData,
		mainInternalModuleId: mainInternalModule.id,
	};
}
