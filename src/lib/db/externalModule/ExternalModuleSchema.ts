import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Schema } from 'mongoose';

export const ExternalModuleSchema = new Schema<ExternalModuleData>(
	{ name: { required: true, type: 'String' } },
	{
		id: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
