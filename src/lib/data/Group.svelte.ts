import type { ByIdBase } from '$lib/editor/ByIdBase';
import type { GroupData } from './GroupData';
import type { Node } from './Node.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Group {
	id: string;
	name: string;
	nodes!: Node[];

	constructor(groupData: GroupData, nodeOptions: ByIdBase<Node>) {
		const { id, name } = groupData;
		this.id = id;
		this.name = name;

		this.nodes = nodeOptions.values().filter((node) => node.groupId === this.id);
	}
}
