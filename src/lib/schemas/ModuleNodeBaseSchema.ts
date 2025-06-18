import z from 'zod/v4';
import { VectorSchema } from './VectorSchema';

export function ModuleNodeBaseSchema<T extends string, E extends z.ZodTypeAny>(type: T, extras: E) {
	return z.object({
		extras,
		id: z.uuid(),
		type: z.literal(type),
		position: VectorSchema,
		internalModuleId: z.uuid(),
		unconnectedInputValues: z.record(z.string(), z.number()),
	});
}
