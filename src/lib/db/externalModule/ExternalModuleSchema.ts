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
		name: { type: String, required: true, maxlength: 100 },
		userId: { type: Schema.Types.ObjectId, required: true },
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

// Add virtual for user
ExternalModuleSchema.virtual('user', {
	ref: 'User',
	justOne: true,
	foreignField: '_id',
	localField: 'userId',
});
