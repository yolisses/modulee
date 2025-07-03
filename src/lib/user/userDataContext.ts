import { setContext } from 'svelte';
import type { UserData } from './UserData';

export type UserDataContext = {
	userData: UserData;
};

export const userDataContextKey = Symbol('userDataContextKey');

export function setUserDataContext(userDataContext: UserDataContext) {
	setContext(userDataContextKey, userDataContext);
}
