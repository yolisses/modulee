import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ZoomContext = {
	zoom: number;
};

export const zoomContextKey = Symbol('zoomContextKey');

export function setZoomContext(zoomContext: ZoomContext) {
	setContext(zoomContextKey, zoomContext);
	updateContext(zoomContextKey);
}
