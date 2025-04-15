import { Schema } from 'mongoose';
import type { UserDocument } from './UserDocument';

export const UserSchema = new Schema<UserDocument>(
	{
		isSeeded: { type: Boolean, required: false },
		name: { type: String, required: true, maxlength: 70 },
		bio: { type: String, required: false, maxlength: 150 },
		username: { type: String, required: true, maxlength: 30, unique: true },
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
