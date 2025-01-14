import type { NodeType } from './NodeType';

export const devNodeTypes: NodeType[] = [
	{
		id: 'add',
		name: 'Add',
		inputNames: ['input1', 'input2'],
		outputNames: ['sum'],
	},
	{
		id: 'subtract',
		name: 'Subtract',
		inputNames: ['input1', 'input2'],
		outputNames: ['difference'],
	},
	{
		id: 'multiply',
		name: 'Multiply',
		inputNames: ['input1', 'input2'],
		outputNames: ['product'],
	},
	{
		id: 'divide',
		name: 'Divide',
		inputNames: ['input1', 'input2'],
		outputNames: ['quotient'],
	},
];
