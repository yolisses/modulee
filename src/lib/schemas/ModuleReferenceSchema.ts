import type { z } from '../../../node_modules/zod/dist/types/v3/external';
import { ExternalModuleReferenceSchema } from './ExternalModuleReferenceSchema';
import { InternalModuleReferenceSchema } from './InternalModuleReferenceSchema';

export const ModuleReferenceSchema = z.union([
	ExternalModuleReferenceSchema,
	InternalModuleReferenceSchema,
]);
