import type { z } from '../../../node_modules/zod/dist/types/v3/external';
import { ConstantNodeSchema } from './ConstantNodeSchema';
import { ControlNodeSchema } from './ControlNodeSchema';
import { InputNodeSchema } from './InputNodeSchema';
import { ModuleNodeSchema } from './ModuleNodeSchema';
import { ModuleVoicesNodeSchema } from './ModuleVoicesNodeSchema';
import { OutputNodeSchema } from './OutputNodeSchema';

export const NodeSchema = z.union([
	InputNodeSchema,
	OutputNodeSchema,
	ModuleNodeSchema,
	ControlNodeSchema,
	ConstantNodeSchema,
	ModuleVoicesNodeSchema,
]);
