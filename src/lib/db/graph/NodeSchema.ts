import { ID_LENGTH } from '$lib/data/ID_LENGTH';
import type { NodeData } from '$lib/data/NodeData';
import { nodeDefinitionMaxLength } from '$lib/node/definitions/nodeDefinitionMaxLength';
import { Schema } from 'mongoose';
import { VectorSchema } from './VectorSchema';

export const NodeSchema = new Schema<NodeData>({
	position: { type: VectorSchema, required: true },
	id: { type: String, required: true, maxlength: ID_LENGTH },
	type: { type: String, required: true, maxlength: nodeDefinitionMaxLength },
	internalModuleId: { type: String, required: true, maxlength: ID_LENGTH },
});
