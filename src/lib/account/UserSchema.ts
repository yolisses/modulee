import { required } from '$lib/db/required';
import { Schema } from 'mongoose';
import type { UserData } from './UserData';

export const UserSchema = new Schema<UserData>(
	{
		name: required(String),
		bio: { type: String, required: false },
		email: { type: String, select: false, required: true, unique: true },
	},
	{
		id: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);
