import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type ModalRootContext = {
	modalRoot: HTMLElement;
};

const modalRootContextKey = Symbol('modalRootContextKey');

export function setModalRootContext(modalRootContext: ModalRootContext) {
	setContext(modalRootContextKey, modalRootContext);
}

export function getModalRootContext() {
	return getContextOrThrow<ModalRootContext>(modalRootContextKey);
}
