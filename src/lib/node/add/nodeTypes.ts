import type { NodeType } from './NodeType';

export const nodeTypes: NodeType[] = [
	// basic
	{ category: 'basic', name: 'GateNode', defaultExtras: {}, inputNames: [] },
	{ category: 'basic', name: 'TimeNode', defaultExtras: {}, inputNames: [] },
	{ category: 'basic', name: 'PitchNode', defaultExtras: {}, inputNames: [] },
	{ category: 'basic', name: 'PhaseNode', defaultExtras: {}, inputNames: ['frequency'] },
	{ category: 'basic', name: 'FrequencyNode', defaultExtras: {}, inputNames: ['pitch'] },
	{ category: 'basic', name: 'ConstantNode', defaultExtras: { value: 1 }, inputNames: [] },
	{ category: 'basic', name: 'HoldNode', defaultExtras: {}, inputNames: ['input', 'trigger'] },
	{
		category: 'basic',
		name: 'EnvelopeNode',
		defaultExtras: {},
		inputNames: ['attack', 'decay', 'sustain', 'release'],
	},
	// filter
	{
		category: 'filter',
		name: 'AllPassNode',
		defaultExtras: {},
		inputNames: ['input', 'frequency', 'resonance'],
	},
	{
		category: 'filter',
		name: 'LowPassNode',
		defaultExtras: {},
		inputNames: ['input', 'frequency', 'resonance'],
	},
	{
		category: 'filter',
		name: 'HighPassNode',
		defaultExtras: {},
		inputNames: ['input', 'frequency', 'resonance'],
	},
	{
		category: 'filter',
		name: 'PeakNode',
		defaultExtras: {},
		inputNames: ['input', 'frequency', 'resonance', 'gain'],
	},
	// logic
	{ category: 'logic', name: 'NotNode', defaultExtras: {}, inputNames: ['input'] },
	{ category: 'logic', name: 'OrNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'logic', name: 'AndNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{
		category: 'logic',
		name: 'IfNode',
		defaultExtras: {},
		inputNames: ['condition', 'input1', 'input2'],
	},
	// math
	{ category: 'math', name: 'AddNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'math', name: 'ModuloNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'math', name: 'DivideNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'math', name: 'GreaterNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'math', name: 'SubtractNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ category: 'math', name: 'MultiplyNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	// module
	{ category: 'module', name: 'ModuleNode', defaultExtras: {}, inputNames: [] },
	{ category: 'module', name: 'ModuleVoicesNode', defaultExtras: {}, inputNames: [] },
	{ category: 'module', name: 'OutputNode', defaultExtras: {}, inputNames: ['input'] },
	{ category: 'module', name: 'InputNode', defaultExtras: { name: 'new input' }, inputNames: [] },
	// random
	{ category: 'random', name: 'NoiseNode', defaultExtras: {}, inputNames: [] },
	{ category: 'random', name: 'RandomFromValueNode', defaultExtras: {}, inputNames: ['value'] },
	// wave
	{ category: 'wave', name: 'SineWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{ category: 'wave', name: 'SawtoothWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{ category: 'wave', name: 'TriangleWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{
		category: 'wave',
		name: 'PulseWaveNode',
		defaultExtras: {},
		inputNames: ['phase', 'duty_cycle'],
	},
];
