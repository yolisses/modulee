import z from 'zod/v4';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleReferenceSchema = z.object({
	id: z.string(),
	version: VersionSchema,
	type: z.literal('external'),
});
