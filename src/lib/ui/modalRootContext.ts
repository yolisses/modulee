import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type ModalRootContext = {
	modalRoot: HTMLElement;
};

export const modalRootContextKey = Symbol('modalRootContextKey');

export function setModalRootContext(modalRootContext: ModalRootContext) {
	setContext(modalRootContextKey, modalRootContext);
}

export function getRequiredContext(modalRootContextKey) {
	return getContextOrThrow<ModalRootContext>(modalRootContextKey);
}
