import type { Version } from '$lib/module/externalModule/Version';
import { Schema } from 'mongoose';

export const VersionSchema = new Schema<Version>(
	{
		major: { required: true, type: Number, min: 0 },
		minor: { required: true, type: Number, min: 0 },
		patch: { required: true, type: Number, min: 0 },
	},
	{ _id: false },
);
