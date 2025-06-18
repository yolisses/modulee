import z from 'zod/v4';
import { VectorSchema } from './VectorSchema';

export function NodeBaseSchema<T extends string, I extends string[], E extends z.ZodTypeAny>(
	type: T,
	inputNames: I,
	extras: E,
) {
	return z.object({
		extras,
		id: z.uuid(),
		type: z.literal(type),
		position: VectorSchema,
		internalModuleId: z.uuid(),
		unconnectedInputValues: z.record(z.enum(inputNames), z.number()),
	});
}
