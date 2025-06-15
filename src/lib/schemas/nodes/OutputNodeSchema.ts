import { z } from 'zod/v4';
import { NodeBaseSchema } from '../NodeBaseSchema';

export const OutputNodeSchema = NodeBaseSchema('OutputNode', ['input'], z.object());
