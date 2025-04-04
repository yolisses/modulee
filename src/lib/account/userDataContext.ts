import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { UserData } from './UserData';

export type UserDataContext = {
	userData?: UserData;
};

const userDataContextKey = Symbol('userDataContextKey');

export function setUserDataContext(userDataContext: UserDataContext) {
	setContext(userDataContextKey, userDataContext);
}

export function getUserDataContext() {
	return getContextOrThrow<UserDataContext>(userDataContextKey);
}
