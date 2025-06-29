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
	NodeBaseSchema('AddNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('ModuloNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('DivideNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('GreaterNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('SubtractNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('MultiplyNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('GateNode', [], z.object({})),
	NodeBaseSchema('TimeNode', [], z.object({})),
	NodeBaseSchema('PitchNode', [], z.object({})),
	NodeBaseSchema('PhaseNode', ['frequency'], z.object({})),
	NodeBaseSchema('FrequencyNode', ['pitch'], z.object({})),
	NodeBaseSchema('ConstantNode', [], ConstantNodeExtrasSchema),
	NodeBaseSchema('ControlNode', [], ControlNodeExtrasSchema),
	NodeBaseSchema('HoldNode', ['input', 'trigger'], z.object({})),
	NodeBaseSchema('EnvelopeNode', ['attack', 'decay', 'sustain', 'release'], z.object({})),
	NodeBaseSchema('AllPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('LowPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('HighPassNode', ['input', 'frequency', 'resonance'], z.object({})),
	NodeBaseSchema('PeakNode', ['input', 'frequency', 'resonance', 'gain'], z.object({})),
	NodeBaseSchema('NoiseNode', [], z.object({})),
	NodeBaseSchema('RandomFromValueNode', ['value'], z.object({})),
	ModuleNodeBaseSchema('ModuleNode', ModuleNodeExtrasSchema),
	ModuleNodeBaseSchema('ModuleVoicesNode', ModuleVoicesNodeExtrasSchema),
	NodeBaseSchema('OutputNode', ['input'], OutputNodeExtrasSchema),
	NodeBaseSchema('InputNode', [], InputNodeExtrasSchema),
	NodeBaseSchema('AudioInputNode', [], z.object({})),
	NodeBaseSchema('SineWaveNode', ['phase'], z.object({})),
	NodeBaseSchema('SawtoothWaveNode', ['phase'], z.object({})),
	NodeBaseSchema('TriangleWaveNode', ['phase'], z.object({})),
	NodeBaseSchema('PulseWaveNode', ['phase', 'duty_cycle'], z.object({})),
	NodeBaseSchema('NotNode', ['input'], z.object({})),
	NodeBaseSchema('OrNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('AndNode', ['input1', 'input2'], z.object({})),
	NodeBaseSchema('IfNode', ['condition', 'input1', 'input2'], z.object({})),
]);
