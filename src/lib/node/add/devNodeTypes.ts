import type { NodeType } from './NodeType.js';

export const devNodeTypes: NodeType[] = [
	{
		id: 'add',
		name: 'AddNode',
		defaultExtras: {},
		outputNames: ['sum'],
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'constant',
		inputNames: [],
		name: 'ConstantNode',
		outputNames: ['value'],
		defaultExtras: { value: 1 },
	},
	{
		id: 'output',
		outputNames: [],
		defaultExtras: {},
		name: 'OutputNode',
		inputNames: ['input'],
	},
	{
		id: 'phase',
		name: 'PhaseNode',
		defaultExtras: {},
		outputNames: ['phase'],
		inputNames: ['time', 'frequency'],
	},
	{
		id: 'sine_wave',
		defaultExtras: {},
		name: 'SineWaveNode',
		inputNames: ['phase'],
		outputNames: ['output'],
	},
	{
		defaultExtras: {},
		id: 'triangle_wave',
		inputNames: ['phase'],
		outputNames: ['output'],
		name: 'TriangleWaveNode',
	},
	{
		inputNames: [],
		id: 'time_node',
		name: 'TimeNode',
		defaultExtras: {},
		outputNames: ['time'],
	},
	{
		id: 'subtract',
		defaultExtras: {},
		name: 'SubtractNode',
		outputNames: ['difference'],
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'multiply',
		defaultExtras: {},
		name: 'MultiplyNode',
		outputNames: ['product'],
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'divide',
		defaultExtras: {},
		name: 'DivideNode',
		outputNames: ['quotient'],
		inputNames: ['input1', 'input2'],
	},
];
