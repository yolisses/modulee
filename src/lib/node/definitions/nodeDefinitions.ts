import type { NodeDefinition } from './NodeDefinition';

export const nodeDefinitions: NodeDefinition[] = [
	{
		category: 'math',
		type: 'CeilNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'SineNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'CosineNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'FloorNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'RoundNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'AddNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 1,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'ModuloNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 2,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'DivideNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 2,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'GreaterNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'SubtractNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 1,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'math',
		type: 'MultiplyNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 2,
				min: 0,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 2,
				max: 2,
				min: 0,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
	{
		category: 'basic',
		type: 'GateNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'basic',
		type: 'TimeNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'basic',
		type: 'SampleRateNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'basic',
		type: 'PitchNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'basic',
		type: 'PhaseNode',
		defaultExtras: {},
		inputs: [
			{
				default: 261.625565,
				max: 22000,
				min: 0,
				key: 'frequency',
				autoConnection: {
					nodeType: 'FrequencyNode',
					byDefault: true,
				},
				isBoolean: false,
			},
		],
	},
	{
		category: 'basic',
		type: 'FrequencyNode',
		defaultExtras: {},
		inputs: [
			{
				default: 60,
				max: 127,
				min: 0,
				key: 'pitch',
				autoConnection: {
					nodeType: 'PitchNode',
					byDefault: true,
				},
				isBoolean: false,
			},
		],
	},
	{
		category: 'basic',
		type: 'ConstantNode',
		defaultExtras: {
			value: 1,
		},
		inputs: [],
	},
	{
		category: 'basic',
		type: 'ControlNode',
		defaultExtras: {
			value: 0,
		},
		inputs: [],
		isIntermediary: true,
	},
	{
		category: 'basic',
		type: 'ValueFromChannelNode',
		defaultExtras: {
			channel: 0,
		},
		inputs: [
			{
				default: 0,
				max: 1,
				min: -1,
				key: 'input',
				isBoolean: false,
			},
		],
		isIntermediary: true,
	},
	{
		category: 'basic',
		type: 'HoldNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'trigger',
				isBoolean: true,
			},
		],
	},
	{
		category: 'basic',
		type: 'DelayNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: -1,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 1,
				max: 2,
				min: 0,
				key: 'time',
				isBoolean: false,
			},
			{
				default: 0,
				max: 2,
				min: 0,
				key: 'max_time',
				isBoolean: false,
			},
		],
	},
	{
		category: 'basic',
		type: 'EnvelopeNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0.01,
				max: 1,
				min: 0,
				key: 'attack',
				isBoolean: false,
			},
			{
				default: 0.1,
				max: 1,
				min: 0,
				key: 'decay',
				isBoolean: false,
			},
			{
				default: 0.7,
				max: 1,
				min: 0,
				key: 'sustain',
				isBoolean: false,
			},
			{
				default: 0.2,
				max: 1,
				min: 0,
				key: 'release',
				isBoolean: false,
			},
		],
	},
	{
		category: 'filter',
		type: 'AllPassNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 1000,
				max: 22000,
				min: 0,
				key: 'frequency',
				isBoolean: false,
			},
			{
				default: 0.7071067811865476,
				max: 1,
				min: 0,
				key: 'resonance',
				isBoolean: false,
			},
		],
	},
	{
		category: 'filter',
		type: 'LowPassNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 1000,
				max: 22000,
				min: 0,
				key: 'frequency',
				isBoolean: false,
			},
			{
				default: 0.7071067811865476,
				max: 1,
				min: 0,
				key: 'resonance',
				isBoolean: false,
			},
		],
	},
	{
		category: 'filter',
		type: 'HighPassNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 1000,
				max: 22000,
				min: 0,
				key: 'frequency',
				isBoolean: false,
			},
			{
				default: 0.7071067811865476,
				max: 1,
				min: 0,
				key: 'resonance',
				isBoolean: false,
			},
		],
	},
	{
		category: 'filter',
		type: 'PeakNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
			{
				default: 1000,
				max: 22000,
				min: 0,
				key: 'frequency',
				isBoolean: false,
			},
			{
				default: 0.7071067811865476,
				max: 1,
				min: 0,
				key: 'resonance',
				isBoolean: false,
			},
			{
				default: 1,
				max: 20,
				min: -20,
				key: 'gain',
				isBoolean: false,
			},
		],
	},
	{
		category: 'random',
		type: 'NoiseNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'random',
		type: 'RandomFromValueNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'value',
				isBoolean: false,
			},
		],
	},
	{
		category: 'module',
		type: 'ModuleNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'module',
		type: 'ModuleVoicesNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'module',
		type: 'OutputNode',
		defaultExtras: {
			channel: 0,
		},
		inputs: [
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input',
				isBoolean: false,
			},
		],
	},
	{
		category: 'module',
		type: 'InputNode',
		defaultExtras: {
			default: 1,
			max: 2,
			min: 0,
			name: 'new input',
		},
		inputs: [],
	},
	{
		category: 'module',
		type: 'AudioInputNode',
		defaultExtras: {},
		inputs: [],
	},
	{
		category: 'wave',
		type: 'SineWaveNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'phase',
				autoConnection: {
					nodeType: 'PhaseNode',
					byDefault: true,
				},
				isBoolean: false,
			},
		],
	},
	{
		category: 'wave',
		type: 'SawtoothWaveNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'phase',
				autoConnection: {
					nodeType: 'PhaseNode',
					byDefault: true,
				},
				isBoolean: false,
			},
		],
	},
	{
		category: 'wave',
		type: 'TriangleWaveNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'phase',
				autoConnection: {
					nodeType: 'PhaseNode',
					byDefault: true,
				},
				isBoolean: false,
			},
		],
	},
	{
		category: 'wave',
		type: 'PulseWaveNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'phase',
				autoConnection: {
					nodeType: 'PhaseNode',
					byDefault: true,
				},
				isBoolean: false,
			},
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'duty_cycle',
				isBoolean: false,
			},
		],
	},
	{
		category: 'logic',
		type: 'NotNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'input',
				isBoolean: true,
			},
		],
	},
	{
		category: 'logic',
		type: 'OrNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'input1',
				isBoolean: true,
			},
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'input2',
				isBoolean: true,
			},
		],
	},
	{
		category: 'logic',
		type: 'AndNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'input1',
				isBoolean: true,
			},
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'input2',
				isBoolean: true,
			},
		],
	},
	{
		category: 'logic',
		type: 'IfNode',
		defaultExtras: {},
		inputs: [
			{
				default: 0,
				max: 1,
				min: 0,
				key: 'condition',
				isBoolean: true,
			},
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input1',
				isBoolean: false,
			},
			{
				default: 0,
				max: 4,
				min: -4,
				key: 'input2',
				isBoolean: false,
			},
		],
	},
];
