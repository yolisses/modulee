import type { GroupData } from './GroupData';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Group {
	id: string;
	name: string;

	constructor(groupData: GroupData) {
		this.id = groupData.id;
		this.name = groupData.name;
	}
}
