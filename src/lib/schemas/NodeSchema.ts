import z from 'zod/v4';
import { ConstantNodeSchema } from './nodes/ConstantNodeSchema';
import { ControlNodeSchema } from './nodes/ControlNodeSchema';
import { InputNodeSchema } from './nodes/InputNodeSchema';
import { ModuleNodeSchema } from './nodes/ModuleNodeSchema';
import { ModuleVoicesNodeSchema } from './nodes/ModuleVoicesNodeSchema';
import { OutputNodeSchema } from './nodes/OutputNodeSchema';

export const NodeSchema = z.union([
	InputNodeSchema,
	OutputNodeSchema,
	ModuleNodeSchema,
	ControlNodeSchema,
	ConstantNodeSchema,
	ModuleVoicesNodeSchema,
]);
