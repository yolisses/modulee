import type { NodeDefinitionCategory } from './NodeDefinitionCategory';

// TODO consider normalizing it
//
// TODO consider creating a type for node type input
export const nodeDefinitionCategories: NodeDefinitionCategory[] = [
	{
		name: 'math',
		nodeDefinitions: [
			{
				category: 'math',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input1',
					},
					{
						defaultValue: 1,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 1,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 2,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
					},
				],
				name: 'MultiplyNode',
			},
		],
	},
	{
		name: 'basic',
		nodeDefinitions: [
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
						key: 'frequency',
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
						key: 'pitch',
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
						key: 'input',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						key: 'trigger',
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
						key: 'attack',
					},
					{
						defaultValue: 0.1,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'decay',
					},
					{
						defaultValue: 0.7,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'sustain',
					},
					{
						defaultValue: 0.2,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'release',
					},
				],
				name: 'EnvelopeNode',
			},
		],
	},
	{
		name: 'filter',
		nodeDefinitions: [
			{
				category: 'filter',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						key: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'resonance',
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
						key: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						key: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'resonance',
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
						key: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						key: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'resonance',
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
						key: 'input',
					},
					{
						defaultValue: 1000,
						isBoolean: false,
						max: 22000,
						min: 0,
						key: 'frequency',
					},
					{
						defaultValue: 0.7071067811865476,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'resonance',
					},
				],
				name: 'PeakNode',
			},
		],
	},
	{
		name: 'random',
		nodeDefinitions: [
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
						key: 'value',
					},
				],
				name: 'RandomFromValueNode',
			},
		],
	},
	{
		name: 'module',
		nodeDefinitions: [
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
						key: 'input',
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
		nodeDefinitions: [
			{
				category: 'wave',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'phase',
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
						key: 'phase',
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
						key: 'phase',
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
						key: 'phase',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 1,
						min: 0,
						key: 'duty_cycle',
					},
				],
				name: 'PulseWaveNode',
			},
		],
	},
	{
		name: 'logic',
		nodeDefinitions: [
			{
				category: 'logic',
				defaultExtras: {},
				inputs: [
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						key: 'input',
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
						key: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						key: 'input2',
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
						key: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: true,
						max: 1,
						min: 0,
						key: 'input2',
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
						key: 'condition',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input1',
					},
					{
						defaultValue: 0,
						isBoolean: false,
						max: 4,
						min: -4,
						key: 'input2',
					},
				],
				name: 'IfNode',
			},
		],
	},
];
