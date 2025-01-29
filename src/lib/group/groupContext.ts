import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type GroupIdContext = {
	groupId: string;
};

const groupIdContextKey = Symbol('groupIdContextKey');

export function setGroupIdContext(groupIdContext: GroupIdContext) {
	setContext(groupIdContextKey, groupIdContext);
}

export function getGroupIdContext() {
	return getContextOrThrow<GroupIdContext>(groupIdContextKey);
}
