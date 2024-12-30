import { Vector } from '$lib/space/Vector';
import { defaultNodeSize } from '../defaultNodeSize';
import type { NodeData } from '../NodeData';

export const devNodesData: NodeData[] = [
	{
		id: '0',
		size: defaultNodeSize.getData(),
		position: defaultNodeSize.multiply(Vector.fromNumber(0)).getData(),
		connectors: [],
	},
	{
		id: '1',
		size: defaultNodeSize,
		position: defaultNodeSize.multiply(Vector.fromNumber(1)).getData(),
		connectors: [{ id: '1/1', name: 'some output' }],
	},
	{
		id: '2',
		size: defaultNodeSize,
		position: defaultNodeSize.multiply(Vector.fromNumber(2)).add(new Vector(5, -16)).getData(),
		connectors: [
			{ id: '2/1', name: 'some input' },
			{ id: '2/2', name: 'some output' },
		],
	},
];
