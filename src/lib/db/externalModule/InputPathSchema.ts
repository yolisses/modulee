import type { InputPath } from '$lib/data/InputPath';
import { Schema } from 'mongoose';

export const InputPathSchema = new Schema<InputPath>({
	nodeId: { type: String, required: true },
	inputKey: { type: String, required: true },
});
