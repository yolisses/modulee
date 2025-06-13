import z from 'zod';
import { ModuleReferenceSchema } from './ModuleReferenceSchema';

export const ModuleNodeExtrasSchema = z.object({
	moduleReference: ModuleReferenceSchema.optional(),
});
