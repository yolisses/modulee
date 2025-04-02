import { required } from '$lib/db/required';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
	name: required(String),
	email: required(String),
});
