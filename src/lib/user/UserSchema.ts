import { Schema } from 'mongoose';
import type { UserData } from './UserData';

export const UserSchema = new Schema<UserData>(
	{
		name: { type: String, required: true, maxlength: 30 },
		bio: { type: String, required: false, maxlength: 150 },
		email: { type: String, required: true, maxlength: 320, unique: true, select: false },
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
