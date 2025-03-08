import type { ConnectionData } from './ConnectionData';
import type { GroupData } from './GroupData';
import type { NodeData } from './NodeData';

/**
 * Although used in `ProjectDataV2` this type isn't "V2" named because of that.
 * It is just because the `GraphData` uses this name incorrectly (it depends on
 * the `ById` class).
 */
export type GraphDataV2 = {
	mainGroupId: string;
	nodes: NodeData[];
	groups: GroupData[];
	connections: ConnectionData[];
};
