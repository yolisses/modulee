import z from 'zod/v4';
import { ConstantNodeExtrasSchema } from '../node/schema/variants/ConstantNodeExtrasSchema';
import { ControlNodeExtrasSchema } from '../node/schema/variants/ControlNodeExtrasSchema';
import { InputNodeExtrasSchema } from '../node/schema/variants/InputNodeExtrasSchema';
import { ModuleNodeExtrasSchema } from '../node/schema/variants/ModuleNodeExtrasSchema';
import { ModuleVoicesNodeExtrasSchema } from '../node/schema/variants/ModuleVoicesNodeExtrasSchema';
import { OutputNodeExtrasSchema } from '../node/schema/variants/OutputNodeExtrasSchema';
import { ModuleNodeBaseSchema } from './ModuleNodeBaseSchema';
import { NodeBaseSchema } from './NodeBaseSchema';

export const NodeSchema = z.union([
	ModuleNodeBaseSchema('ModuleNode', ModuleNodeExtrasSchema),
	ModuleNodeBaseSchema('ModuleVoicesNode', ModuleVoicesNodeExtrasSchema),
	NodeBaseSchema('AddNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('AllPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('AndNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('AudioInputNode', [], z.object({})),
	NodeBaseSchema('ConstantNode', [], ConstantNodeExtrasSchema),
	NodeBaseSchema('ControlNode', [], ControlNodeExtrasSchema),
	NodeBaseSchema('DelayNode', ['input', 'time', 'max_time'], z.object({})),
	NodeBaseSchema('DivideNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('EnvelopeNode', ['attack', 'decay', 'sustain', 'release'], z.object({})),
	NodeBaseSchema('FrequencyNode', ['pitch'], z.object({})),
	NodeBaseSchema('GateNode', [], z.object({})),
	NodeBaseSchema('GreaterNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('HighPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('HoldNode', ['input', 'trigger'], z.object({})),
	NodeBaseSchema('IfNode', ['condition', 'input1', 'input2'], z.object({})),
	NodeBaseSchema('InputNode', [], InputNodeExtrasSchema),
	NodeBaseSchema('LowPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('ModuloNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('MultiplyNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('NoiseNode', [], z.object({})),
	NodeBaseSchema('NotNode', ['input'], z.object({})),
	NodeBaseSchema('OrNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('OutputNode', ['input'], OutputNodeExtrasSchema),
	NodeBaseSchema('PeakNode', ['input', 'frequency', 'resonance', 'gain'], z.object({})),
	NodeBaseSchema('PhaseNode', ['frequency'], z.object({})),
	NodeBaseSchema('PitchNode', [], z.object({})),
	NodeBaseSchema('PulseWaveNode', ['phase', 'duty_cycle'], z.object({})),
	NodeBaseSchema('RandomFromValueNode', ['value'], z.object({})),
	NodeBaseSchema('SawtoothWaveNode', ['phase'], z.object({})),
	NodeBaseSchema('SineWaveNode', ['phase'], z.object({})),
	NodeBaseSchema('SubtractNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('TimeNode', [], z.object({})),
	NodeBaseSchema('TriangleWaveNode', ['phase'], z.object({})),
]);
