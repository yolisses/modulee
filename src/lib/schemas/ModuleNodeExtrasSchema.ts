import z from 'zod/v4';
import { ModuleReferenceSchema } from './ModuleReferenceSchema';

export const ModuleNodeExtrasSchema = z.object({
	moduleReference: ModuleReferenceSchema.optional(),
});
