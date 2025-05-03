import { ID_LENGTH } from '$lib/data/ID_LENGTH';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypeMaxLength } from '$lib/node/definitions/nodeTypeMaxLength';
import { Schema } from 'mongoose';
import { VectorSchema } from './VectorSchema';

export const NodeSchema = new Schema<NodeData>({
	position: { type: VectorSchema, required: true },
	id: { type: String, required: true, maxlength: ID_LENGTH },
	type: { type: String, required: true, maxlength: nodeTypeMaxLength },
	internalModuleId: { type: String, required: true, maxlength: ID_LENGTH },
});
