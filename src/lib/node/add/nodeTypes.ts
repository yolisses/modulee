import type { NodeType } from './NodeType';

// TODO generate this data in the engine build
export const nodeTypes: NodeType[] = [
	{
		id: 'group',
		inputNames: [],
		name: 'GroupNode',
		defaultExtras: {},
	},
	{
		id: 'add',
		name: 'AddNode',
		defaultExtras: {},
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'constant',
		inputNames: [],
		name: 'ConstantNode',
		defaultExtras: { value: 1 },
	},
	{
		id: 'output',
		defaultExtras: {},
		name: 'OutputNode',
		inputNames: ['input'],
	},
	{
		id: 'input',
		inputNames: [],
		name: 'InputNode',
		defaultExtras: { name: 'new input' },
	},
	{
		id: 'phase',
		name: 'PhaseNode',
		defaultExtras: {},
		inputNames: ['frequency'],
	},
	{
		id: 'pitch',
		inputNames: [],
		name: 'PitchNode',
		defaultExtras: {},
	},
	{
		id: 'gate',
		inputNames: [],
		name: 'GateNode',
		defaultExtras: {},
	},
	{
		id: 'frequency',
		defaultExtras: {},
		inputNames: ['pitch'],
		name: 'FrequencyNode',
	},
	{
		id: 'sine_wave',
		defaultExtras: {},
		name: 'SineWaveNode',
		inputNames: ['phase'],
	},
	{
		defaultExtras: {},
		id: 'triangle_wave',
		inputNames: ['phase'],
		name: 'TriangleWaveNode',
	},
	{
		inputNames: [],
		id: 'time_node',
		name: 'TimeNode',
		defaultExtras: {},
	},
	{
		id: 'subtract',
		defaultExtras: {},
		name: 'SubtractNode',
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'multiply',
		defaultExtras: {},
		name: 'MultiplyNode',
		inputNames: ['input1', 'input2'],
	},
	{
		id: 'divide',
		defaultExtras: {},
		name: 'DivideNode',
		inputNames: ['input1', 'input2'],
	},
];
