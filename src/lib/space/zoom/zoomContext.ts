import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type ZoomContext = {
	zoom: number;
};

export const zoomContextKey = Symbol('zoomContextKey');

export function setZoomContext(zoomContext: ZoomContext) {
	setContext(zoomContextKey, zoomContext);
}

export function getZoomContext() {
	return getContextOrThrow<ZoomContext>(zoomContextKey);
}
