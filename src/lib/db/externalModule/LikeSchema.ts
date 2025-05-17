import { Schema } from 'mongoose';

export const LikeSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true },
		externalModuleId: { type: Schema.Types.ObjectId, required: true },
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

LikeSchema.index({ userId: 1, externalModuleId: 1 }, { unique: true });
