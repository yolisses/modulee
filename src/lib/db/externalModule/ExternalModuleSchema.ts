import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Schema } from 'mongoose';

export const ExternalModuleSchema = new Schema<ExternalModuleData>(
	{ name: { type: String, required: true, maxlength: 255 } },
	{
		id: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
