import type { NodeType } from './NodeType';

// TODO generate this data in the engine build
export const nodeTypes: NodeType[] = [
	{ name: 'GateNode', defaultExtras: {}, inputNames: [] },
	{ name: 'TimeNode', defaultExtras: {}, inputNames: [] },
	{ name: 'PitchNode', defaultExtras: {}, inputNames: [] },
	{ name: 'InternalModuleNode', defaultExtras: {}, inputNames: [] },
	{ name: 'NoiseNode', defaultExtras: {}, inputNames: [] },
	{ name: 'InternalModuleVoicesNode', defaultExtras: {}, inputNames: [] },
	{ name: 'OutputNode', defaultExtras: {}, inputNames: ['input'] },
	{ name: 'SineWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{ name: 'PhaseNode', defaultExtras: {}, inputNames: ['frequency'] },
	{ name: 'FrequencyNode', defaultExtras: {}, inputNames: ['pitch'] },
	{ name: 'ConstantNode', defaultExtras: { value: 1 }, inputNames: [] },
	{ name: 'SawtoothWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{ name: 'TriangleWaveNode', defaultExtras: {}, inputNames: ['phase'] },
	{ name: 'AddNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ name: 'InputNode', defaultExtras: { name: 'new input' }, inputNames: [] },
	{ name: 'DivideNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ name: 'SubtractNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ name: 'MultiplyNode', defaultExtras: {}, inputNames: ['input1', 'input2'] },
	{ name: 'LowPassNode', defaultExtras: {}, inputNames: ['input', 'frequency', 'resonance'] },
	{ name: 'HighPassNode', defaultExtras: {}, inputNames: ['input', 'frequency', 'resonance'] },
	{
		name: 'EnvelopeNode',
		defaultExtras: {},
		inputNames: ['attack', 'decay', 'sustain', 'release'],
	},
];
