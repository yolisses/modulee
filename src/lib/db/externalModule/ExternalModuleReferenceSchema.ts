import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import { Schema } from 'mongoose';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleReferenceSchema = new Schema<ExternalModuleReference>({
	type: { type: String, required: true },
	version: { type: VersionSchema, required: true },
});
