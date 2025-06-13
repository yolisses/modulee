import z from 'zod';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleReferenceSchema = z.object({
	id: z.string(),
	version: VersionSchema,
	type: z.literal('external'),
});
