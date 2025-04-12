import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Schema } from 'mongoose';
import { GraphSchema } from '../graph/GraphSchema';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleSchema = new Schema<ExternalModuleData>(
	{
		version: VersionSchema,
		projectId: { type: String, required: true },
		likeCount: { type: Number, required: true },
		graph: { type: GraphSchema, required: true },
		usageCount: { type: Number, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		name: { type: String, required: true, maxlength: 100 },
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
