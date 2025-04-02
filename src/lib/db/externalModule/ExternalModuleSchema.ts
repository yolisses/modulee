import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Schema } from 'mongoose';
import { required } from '../required';

export const ExternalModuleSchema = new Schema<ExternalModuleData>(
	{ name: required(String) },
	{
		id: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
