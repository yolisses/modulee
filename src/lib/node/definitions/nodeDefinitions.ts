import type { NodeDefinition } from './NodeDefinition';

export const nodeDefinitions: NodeDefinition[] = [
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 1, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'AddNode',
	},
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 2, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'ModuloNode',
	},
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 2, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'DivideNode',
	},
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 0, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'GreaterNode',
	},
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 1, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'SubtractNode',
	},
	{
		category: 'math',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input1', max: 2, min: 0 },
			{ default: 2, isBoolean: false, key: 'input2', max: 2, min: 0 },
		],
		type: 'MultiplyNode',
	},
	{ category: 'basic', defaultExtras: {}, inputs: [], type: 'GateNode' },
	{ category: 'basic', defaultExtras: {}, inputs: [], type: 'TimeNode' },
	{ category: 'basic', defaultExtras: {}, inputs: [], type: 'PitchNode' },
	{
		category: 'basic',
		defaultExtras: {},
		inputs: [{ default: 261.625565, isBoolean: false, key: 'frequency', max: 22000, min: 0 }],
		type: 'PhaseNode',
	},
	{
		category: 'basic',
		defaultExtras: {},
		inputs: [{ default: 60, isBoolean: false, key: 'pitch', max: 127, min: 0 }],
		type: 'FrequencyNode',
	},
	{ category: 'basic', defaultExtras: { value: 1 }, inputs: [], type: 'ConstantNode' },
	{ category: 'basic', defaultExtras: { value: 0 }, inputs: [], type: 'ControlNode' },
	{
		category: 'basic',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 },
			{ default: 0, isBoolean: true, key: 'trigger', max: 1, min: 0 },
		],
		type: 'HoldNode',
	},
	{
		category: 'basic',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: -1, min: 1 },
			{ default: 1, isBoolean: false, key: 'time', max: 2, min: 0 },
			{ default: 0, isBoolean: false, key: 'max_time', max: 1, min: 0 },
		],
		type: 'DelayNode',
	},
	{
		category: 'basic',
		defaultExtras: {},
		inputs: [
			{ default: 0.01, isBoolean: false, key: 'attack', max: 1, min: 0 },
			{ default: 0.1, isBoolean: false, key: 'decay', max: 1, min: 0 },
			{ default: 0.7, isBoolean: false, key: 'sustain', max: 1, min: 0 },
			{ default: 0.2, isBoolean: false, key: 'release', max: 1, min: 0 },
		],
		type: 'EnvelopeNode',
	},
	{
		category: 'filter',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 },
			{ default: 1000, isBoolean: false, key: 'frequency', max: 22000, min: 0 },
			{ default: 0.7071067811865476, isBoolean: false, key: 'resonance', max: 1, min: 0 },
		],
		type: 'AllPassNode',
	},
	{
		category: 'filter',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 },
			{ default: 1000, isBoolean: false, key: 'frequency', max: 22000, min: 0 },
			{ default: 0.7071067811865476, isBoolean: false, key: 'resonance', max: 1, min: 0 },
		],
		type: 'LowPassNode',
	},
	{
		category: 'filter',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 },
			{ default: 1000, isBoolean: false, key: 'frequency', max: 22000, min: 0 },
			{ default: 0.7071067811865476, isBoolean: false, key: 'resonance', max: 1, min: 0 },
		],
		type: 'HighPassNode',
	},
	{
		category: 'filter',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 },
			{ default: 1000, isBoolean: false, key: 'frequency', max: 22000, min: 0 },
			{ default: 0.7071067811865476, isBoolean: false, key: 'resonance', max: 1, min: 0 },
			{ default: 1, isBoolean: false, key: 'gain', max: 20, min: -20 },
		],
		type: 'PeakNode',
	},
	{ category: 'random', defaultExtras: {}, inputs: [], type: 'NoiseNode' },
	{
		category: 'random',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: false, key: 'value', max: 4, min: -4 }],
		type: 'RandomFromValueNode',
	},
	{ category: 'module', defaultExtras: {}, inputs: [], type: 'ModuleNode' },
	{ category: 'module', defaultExtras: {}, inputs: [], type: 'ModuleVoicesNode' },
	{
		category: 'module',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: false, key: 'input', max: 4, min: -4 }],
		type: 'OutputNode',
	},
	{
		category: 'module',
		defaultExtras: { default: 1, max: 2, min: 0, name: 'new input' },
		inputs: [],
		type: 'InputNode',
	},
	{ category: 'module', defaultExtras: {}, inputs: [], type: 'AudioInputNode' },
	{
		category: 'wave',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: false, key: 'phase', max: 1, min: 0 }],
		type: 'SineWaveNode',
	},
	{
		category: 'wave',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: false, key: 'phase', max: 1, min: 0 }],
		type: 'SawtoothWaveNode',
	},
	{
		category: 'wave',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: false, key: 'phase', max: 1, min: 0 }],
		type: 'TriangleWaveNode',
	},
	{
		category: 'wave',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: false, key: 'phase', max: 1, min: 0 },
			{ default: 0, isBoolean: false, key: 'duty_cycle', max: 1, min: 0 },
		],
		type: 'PulseWaveNode',
	},
	{
		category: 'logic',
		defaultExtras: {},
		inputs: [{ default: 0, isBoolean: true, key: 'input', max: 1, min: 0 }],
		type: 'NotNode',
	},
	{
		category: 'logic',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: true, key: 'input1', max: 1, min: 0 },
			{ default: 0, isBoolean: true, key: 'input2', max: 1, min: 0 },
		],
		type: 'OrNode',
	},
	{
		category: 'logic',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: true, key: 'input1', max: 1, min: 0 },
			{ default: 0, isBoolean: true, key: 'input2', max: 1, min: 0 },
		],
		type: 'AndNode',
	},
	{
		category: 'logic',
		defaultExtras: {},
		inputs: [
			{ default: 0, isBoolean: true, key: 'condition', max: 1, min: 0 },
			{ default: 0, isBoolean: false, key: 'input1', max: 4, min: -4 },
			{ default: 0, isBoolean: false, key: 'input2', max: 4, min: -4 },
		],
		type: 'IfNode',
	},
];
