import z from 'zod/v4';

// TODO replace any by object

export function NodeBaseSchema<T extends string, E extends z.ZodTypeAny = z.ZodUndefined>(
	type: T,
	extras?: E,
) {
	return z.object({
		type: z.literal(type),
		...(extras ? { extras: extras } : {}),
	});
}
