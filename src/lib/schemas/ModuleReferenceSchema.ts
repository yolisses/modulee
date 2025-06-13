import z from 'zod/v4';
import { ExternalModuleReferenceSchema } from './ExternalModuleReferenceSchema';
import { InternalModuleReferenceSchema } from './InternalModuleReferenceSchema';

export const ModuleReferenceSchema = z.union([
	ExternalModuleReferenceSchema,
	InternalModuleReferenceSchema,
]);
