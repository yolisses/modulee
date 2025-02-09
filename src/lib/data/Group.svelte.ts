import type { GroupData } from './GroupData';
import type { Node } from './Node.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Group {
	id: string;
	name: string;
	nodes!: Node[];

	constructor(groupData: GroupData, nodeOptions: Node[]) {
		this.id = groupData.id;
		this.name = groupData.name;
		this.nodes = nodeOptions.filter((node) => node.groupId === this.id);
	}
}
