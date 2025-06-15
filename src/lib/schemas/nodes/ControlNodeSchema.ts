import z from 'zod/v4';
import { NodeBaseSchema } from '../NodeBaseSchema';

export const ControlNodeSchema = NodeBaseSchema('ControlNode', [], z.object({ value: z.number() }));
