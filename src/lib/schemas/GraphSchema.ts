import { z } from 'zod';
import { ConnectionSchema } from './ConnectionSchema';
import { ExternalModuleReferenceSchema } from './ExternalModuleReferenceSchema';
import { InternalModuleSchema } from './InternalModuleSchema';
import { NodeSchema } from './NodeSchema';

export const GraphSchema = z.object({
	nodes: z.array(NodeSchema),
	mainInternalModuleId: z.string(),
	connections: z.array(ConnectionSchema),
	internalModules: z.array(InternalModuleSchema),
	externalModuleReferences: z.array(ExternalModuleReferenceSchema),
});
