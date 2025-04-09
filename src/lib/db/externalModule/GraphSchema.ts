import type { GraphData } from '$lib/data/GraphData';
import { Schema } from 'mongoose';
import { ConnectionSchema } from './ConnectionSchema';
import { InternalModuleSchema } from './InternalModuleSchema';
import { NodeSchema } from './NodeSchema';
import { ExternalModuleReferenceSchema } from './ExternalModuleReferenceSchema';

export const GraphSchema = new Schema<GraphData>({
	nodes: { type: [NodeSchema], required: true },
	mainInternalModuleId: { type: String, required: true },
	connections: { type: [ConnectionSchema], required: true },
	internalModules: { type: [InternalModuleSchema], required: true },
	externalModuleReferences: { type: [ExternalModuleReferenceSchema], required: true },
});
