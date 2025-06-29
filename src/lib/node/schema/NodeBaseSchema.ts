import { VectorSchema } from '$lib/schemas/VectorSchema';
import z from 'zod/v4';

export function NodeBaseSchema<T extends string, I extends string[], E extends z.ZodTypeAny>(
	type: T,
	inputNames: I,
	extras: E,
) {
	return z.object({
		extras,
		id: z.uuidv4(),
		type: z.literal(type),
		position: VectorSchema,
		internalModuleId: z.uuidv4(),
		unconnectedInputValues: z.record(z.enum(inputNames), z.number()),
	});
}
