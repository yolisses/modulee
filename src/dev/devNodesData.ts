import type { NodeData } from 'modulee-nodes-editor';

export const devNodesData: NodeData[] = [
	{
		inputs: [],
		id: 'constantNode',
		type: 'ConstantNode',
		extras: { value: 42 },
		position: { x: 0, y: 0 },
		outputs: [{ name: 'output', id: 'constantNodeDefaultOutput' }],
	},
	{
		extras: {},
		outputs: [],
		id: 'outputNode',
		type: 'OutputNode',
		position: { x: 8, y: 0 },
		inputs: [
			{ id: 'outputNodeInput', name: 'input', connectedOutputId: 'constantNodeDefaultOutput' },
		],
	},
];
