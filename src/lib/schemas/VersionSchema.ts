import z from 'zod';

export const VersionSchema = z.object({
	major: z.string(),
	minor: z.string(),
	patch: z.string(),
});
