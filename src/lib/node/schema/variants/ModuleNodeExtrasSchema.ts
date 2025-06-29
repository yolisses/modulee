import z from 'zod/v4';
import { ModuleReferenceSchema } from '../../../schemas/ModuleReferenceSchema';

export const ModuleNodeExtrasSchema = z.object({
	moduleReference: ModuleReferenceSchema.optional(),
});
