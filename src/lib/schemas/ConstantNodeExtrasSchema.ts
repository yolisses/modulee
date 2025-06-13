import type { z } from '../../../node_modules/zod/dist/types/v3/external';

export const ConstantNodeExtrasSchema = z.object({ value: z.number() });
