import { z } from 'zod/v4';

export const VectorSchema = z.object({ x: z.number(), y: z.number() });
