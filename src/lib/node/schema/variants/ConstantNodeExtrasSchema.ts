import z from 'zod/v4';

export const ConstantNodeExtrasSchema = z.object({ value: z.number() });
