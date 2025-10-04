import z from 'zod/v4';
import { VectorSchema } from './VectorSchema';

export function NodeBaseSchema<
	//
	T extends string,
	I extends string[],
	A extends string[],
	E extends z.ZodTypeAny,
>(type: T, inputNames: I, autoConnectedInputNames: A, extras: E) {
	return z.object({
		extras,
		id: z.uuidv4(),
		internalModuleId: z.uuidv4(),
		isInputAutoConnectedMap: z.record(z.enum(autoConnectedInputNames), z.boolean()),
		name: z.string().optional(),
		position: VectorSchema,
		type: z.literal(type),
		unconnectedInputValues: z.record(z.enum(inputNames), z.number()),
	});
}
