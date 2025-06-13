import { ControlNodeExtrasSchema } from './ControlNodeExtrasSchema';
import { NodeBaseSchema } from './NodeBaseSchema';

export const ControlNodeSchema = NodeBaseSchema('ControlNode', ControlNodeExtrasSchema);
