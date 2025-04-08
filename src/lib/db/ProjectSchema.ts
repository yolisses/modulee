import { Schema } from 'mongoose';

export const ProjectSchema = new Schema(
	{
		name: { type: String, required: true, maxlength: 100 },
		description: { type: String, required: false, maxlength: 1000 },
	},
	{
		timestamps: true,
	},
);
