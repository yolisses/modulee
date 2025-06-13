import z from 'zod/v4';

export const VersionSchema = z.object({
	major: z.string(),
	minor: z.string(),
	patch: z.string(),
});
