import { Schema } from 'mongoose';
import { required } from './required';

export const ProjectSchema = new Schema({
	name: required(String),
});
