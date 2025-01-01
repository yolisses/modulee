import { getContext, setContext } from 'svelte';
import type { PreviewConnectionWrapper } from './PreviewConnectionWrapper';

const previewConnectionKey = Symbol('previewConnection');

export function setPreviewConnectionContext(previewConnectionWrapper: PreviewConnectionWrapper) {
	setContext(previewConnectionKey, previewConnectionWrapper);
}

export function getPreviewConnectionContext() {
	getContext(previewConnectionKey);
}
