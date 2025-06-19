import z from 'zod/v4';
import { ConnectionSchema } from './ConnectionSchema';
import { InternalModuleSchema } from './InternalModuleSchema';
import { NodeSchema } from './NodeSchema';

export const GraphSchema = z.object({
	nodes: z.array(NodeSchema),
	mainInternalModuleId: z.uuidv4(),
	connections: z.array(ConnectionSchema),
	internalModules: z.array(InternalModuleSchema),
});
