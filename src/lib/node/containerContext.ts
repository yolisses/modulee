import { getContext, setContext } from 'svelte';
import type { ContainerWrapper } from './ContainerWrapper';

const containerKey = Symbol('container');

export function setContainerContext(containerWrapper: ContainerWrapper) {
	setContext(containerKey, containerWrapper);
}

export function getContainerContext(): ContainerWrapper {
	return getContext(containerKey) as ContainerWrapper;
}
