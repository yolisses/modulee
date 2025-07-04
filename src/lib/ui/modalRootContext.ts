import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ModalRootContext = {
	modalRoot: HTMLElement;
};

export const modalRootContextKey = Symbol('modalRootContextKey');

export function setModalRootContext(modalRootContext: ModalRootContext) {
	setContext(modalRootContextKey, modalRootContext);
	updateContext(modalRootContextKey);
}
