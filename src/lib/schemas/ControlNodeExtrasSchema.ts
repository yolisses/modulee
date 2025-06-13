import z from 'zod/v4';

export const ControlNodeExtrasSchema = z.object({ value: z.number() });
