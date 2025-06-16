import z from 'zod/v4';
import { ModuleReferenceSchema } from '../ModuleReferenceSchema';

export const ModuleVoicesNodeExtrasSchema = z.object({
	moduleReference: ModuleReferenceSchema.optional(),
});
