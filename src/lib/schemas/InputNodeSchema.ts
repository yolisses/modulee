import { InputNodeExtrasSchema } from './InputNodeExtrasSchema';
import { NodeBaseSchema } from './NodeBaseSchema';

// Node variants

export const InputNodeSchema = NodeBaseSchema('InputNode', InputNodeExtrasSchema);
