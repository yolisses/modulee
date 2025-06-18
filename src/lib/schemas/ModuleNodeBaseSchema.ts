import z from 'zod/v4';
import { VectorSchema } from './VectorSchema';

export function ModuleNodeBaseSchema<T extends string, E extends z.ZodTypeAny>(type: T, extras: E) {
	return z.object({
		extras,
		id: z.uuidv4(),
		type: z.literal(type),
		position: VectorSchema,
		internalModuleId: z.uuidv4(),
		unconnectedInputValues: z.record(z.string(), z.number()),
	});
}
