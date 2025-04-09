import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Schema } from 'mongoose';
import { GraphSchema } from './GraphSchema';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleSchema = new Schema<ExternalModuleData>(
	{
		version: VersionSchema,
		projectId: { type: String, required: true },
		graph: { type: GraphSchema, required: true },
		name: { type: String, required: true, maxlength: 255 },
		description: { type: String, required: false, maxlength: 1000 },
	},
	{
		id: true,
		timestamps: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
