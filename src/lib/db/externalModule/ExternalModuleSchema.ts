import { Schema } from 'mongoose';

export const ExternalModuleSchema = new Schema(
	{ name: String },
	{
		id: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
