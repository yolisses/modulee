import type { ConnectionData } from '$lib/data/ConnectionData';
import { ID_LENGTH } from '$lib/data/ID_LENGTH';
import { Schema } from 'mongoose';
import { InputPathSchema } from './InputPathSchema';

export const ConnectionSchema = new Schema<ConnectionData>({
	inputPath: { type: InputPathSchema, required: true },
	id: { type: String, required: true, maxlength: ID_LENGTH },
	targetNodeId: { type: String, required: true, maxlength: ID_LENGTH },
});
