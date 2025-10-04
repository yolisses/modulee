import z from 'zod/v4';
import { VectorSchema } from './VectorSchema';

export function ModuleNodeBaseSchema<T extends string, E extends z.ZodTypeAny>(type: T, extras: E) {
	return z.object({
		extras,
		id: z.uuidv4(),
		internalModuleId: z.uuidv4(),
		isInputAutoConnectedMap: z.record(z.enum([]), z.boolean()),
		name: z.string().optional(),
		position: VectorSchema,
		type: z.literal(type),
		unconnectedInputValues: z.record(z.string(), z.number()),
	});
}
