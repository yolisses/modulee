import type { NodeType } from './NodeType';

// TODO generate this data in the engine build
export const nodeTypes: NodeType[] = [
	{
		inputNames: [],
		name: 'GroupNode',
		defaultExtras: {},
	},
	{
		name: 'AddNode',
		defaultExtras: {},
		inputNames: ['input1', 'input2'],
	},
	{
		inputNames: [],
		name: 'ConstantNode',
		defaultExtras: { value: 1 },
	},
	{
		defaultExtras: {},
		name: 'OutputNode',
		inputNames: ['input'],
	},
	{
		inputNames: [],
		name: 'InputNode',
		defaultExtras: { name: 'new input' },
	},
	{
		name: 'PhaseNode',
		defaultExtras: {},
		inputNames: ['frequency'],
	},
	{
		inputNames: [],
		name: 'PitchNode',
		defaultExtras: {},
	},
	{
		inputNames: [],
		name: 'GateNode',
		defaultExtras: {},
	},
	{
		defaultExtras: {},
		inputNames: ['pitch'],
		name: 'FrequencyNode',
	},
	{
		defaultExtras: {},
		name: 'SineWaveNode',
		inputNames: ['phase'],
	},
	{
		defaultExtras: {},
		inputNames: ['phase'],
		name: 'TriangleWaveNode',
	},
	{
		inputNames: [],
		name: 'TimeNode',
		defaultExtras: {},
	},
	{
		defaultExtras: {},
		name: 'SubtractNode',
		inputNames: ['input1', 'input2'],
	},
	{
		defaultExtras: {},
		name: 'MultiplyNode',
		inputNames: ['input1', 'input2'],
	},
	{
		defaultExtras: {},
		name: 'DivideNode',
		inputNames: ['input1', 'input2'],
	},
];
