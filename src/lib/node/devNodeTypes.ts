import type { NodeType } from './NodeType';

export const devNodeTypes: NodeType[] = [
	{
		id: 'add',
		name: 'Add',
		inputNames: ['addend1', 'addend2'],
		outputNames: ['sum'],
	},
	{
		id: 'subtract',
		name: 'Subtract',
		inputNames: ['minuend', 'subtrahend'],
		outputNames: ['difference'],
	},
	{
		id: 'multiply',
		name: 'Multiply',
		inputNames: ['multiplicand', 'multiplier'],
		outputNames: ['product'],
	},
	{
		id: 'divide',
		name: 'Divide',
		inputNames: ['dividend', 'divisor'],
		outputNames: ['quotient'],
	},
];
