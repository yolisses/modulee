import type { z } from '../../../node_modules/zod/dist/types/v3/external';

export const InternalModuleReferenceSchema = z.object({
	id: z.string(),
	type: z.literal('internal'),
});
