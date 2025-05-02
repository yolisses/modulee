import type { NodeTypeCategory } from './NodeTypeCategory';

// TODO consider normalizing it
//
// TODO consider creating a type for node type input
export const nodeTypeCategories: NodeTypeCategory[] = [
	{
		name: 'math',
		nodeTypes: [
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 1,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'AddNode',
			},
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'ModuloNode',
			},
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'DivideNode',
			},
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'GreaterNode',
			},
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 1,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'SubtractNode',
			},
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input2',
					},
				],
				name: 'MultiplyNode',
			},
		],
	},
	{
		name: 'basic',
		nodeTypes: [
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [],
				name: 'GateNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [],
				name: 'TimeNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [],
				name: 'PitchNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 261.625565,
						isBoolean: false,
						max: 22000,
						min: 0,
						name: 'frequency',
					},
				],
				name: 'PhaseNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 60,
						isBoolean: false,
						max: 127,
						min: 0,
						name: 'pitch',
					},
				],
				name: 'FrequencyNode',
			},
			{
				category: 'basic',
				defaultExtras: {
					value: 1,
				},
				inputs: [],
				name: 'ConstantNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'trigger',
					},
				],
				name: 'HoldNode',
			},
			{
				category: 'basic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0.01,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'attack',
					},
					{
						defaultValue: 0.1,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'decay',
					},
					{
						defaultValue: 0.2,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'release',
					},
					{
						defaultValue: 0.7,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'sustain',
					},
				],
				name: 'EnvelopeNode',
			},
		],
	},
	{
		name: 'filter',
		nodeTypes: [
			{
				category: 'filter',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						name: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'resonance',
					},
				],
				name: 'AllPassNode',
			},
			{
				category: 'filter',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						name: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'resonance',
					},
				],
				name: 'LowPassNode',
			},
			{
				category: 'filter',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						name: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'resonance',
					},
				],
				name: 'HighPassNode',
			},
			{
				category: 'filter',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						name: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'resonance',
					},
				],
				name: 'PeakNode',
			},
		],
	},
	{
		name: 'random',
		nodeTypes: [
			{
				category: 'random',
				defaultExtras: {},
				inputs: [],
				name: 'NoiseNode',
			},
			{
				category: 'random',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'value',
					},
				],
				name: 'RandomFromValueNode',
			},
		],
	},
	{
		name: 'module',
		nodeTypes: [
			{
				category: 'module',
				defaultExtras: {},
				inputs: [],
				name: 'ModuleNode',
			},
			{
				category: 'module',
				defaultExtras: {},
				inputs: [],
				name: 'ModuleVoicesNode',
			},
			{
				category: 'module',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						name: 'input',
					},
				],
				name: 'OutputNode',
			},
			{
				category: 'module',
				defaultExtras: {
					name: 'new input',
				},
				inputs: [],
				name: 'InputNode',
			},
		],
	},
	{
		name: 'wave',
		nodeTypes: [
			{
				category: 'wave',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'phase',
					},
				],
				name: 'SineWaveNode',
			},
			{
				category: 'wave',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'phase',
					},
				],
				name: 'SawtoothWaveNode',
			},
			{
				category: 'wave',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'phase',
					},
				],
				name: 'TriangleWaveNode',
			},
			{
				category: 'wave',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'phase',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						name: 'duty_cycle',
					},
				],
				name: 'PulseWaveNode',
			},
		],
	},
	{
		name: 'logic',
		nodeTypes: [
			{
				category: 'logic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input',
					},
				],
				name: 'NotNode',
			},
			{
				category: 'logic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input2',
					},
				],
				name: 'OrNode',
			},
			{
				category: 'logic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input2',
					},
				],
				name: 'AndNode',
			},
			{
				category: 'logic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'condition',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						name: 'input2',
					},
				],
				name: 'IfNode',
			},
		],
	},
];
