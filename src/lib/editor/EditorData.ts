import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import type { ById } from './ById.svelte';
import type { Command } from './Command';

export type EditorData = {
	history: Command[];
	nodes: ById<NodeData>;
	groups: ById<GroupData>;
	undoneHistory: Command[];
	connections: ById<ConnectionData>;
};
