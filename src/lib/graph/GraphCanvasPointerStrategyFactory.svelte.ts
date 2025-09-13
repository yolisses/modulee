import { editorContextKey } from '$lib/editor/editorContext';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { addNodeMenuParamsContextKey } from '$lib/node/add/addNodeMenuParamsContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import {
	previewConnectionContextKey,
	PreviewConnectionPointerStrategy,
	rootElementContextKey,
	SelectionBoxPointerStrategy,
} from 'nodes-editor';
import { onMount } from 'svelte';
import { graphContextKey } from './graphContext';
import { PreviewConnectionEndHandler } from './PreviewConnectionEndHandler';

export class GraphCanvasPointerStrategyFactory {
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);
	editorContext = getRequiredContext(editorContextKey);
	graphContext = getRequiredContext(graphContextKey);
	isTouchDevice = $state<boolean>();
	previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	previewConnectionEndHandler: PreviewConnectionEndHandler;
	projectDataContext = getRequiredContext(projectDataContextKey);
	rootElementContext = getRequiredContext(rootElementContextKey);
	spaceContext = getRequiredContext(spaceContextKey);

	constructor() {
		this.previewConnectionEndHandler = new PreviewConnectionEndHandler();
		onMount(() => {
			this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		});
	}

	getPointerStrategy() {
		function selectionBoxPointerCondition(e: PointerEvent) {
			// Ignore mouse right button, used for adding a node
			return e.button !== 2;
		}

		const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy(
			this.rootElementContext.rootElement!,
			!!this.isTouchDevice,
			selectionBoxPointerCondition,
		);
		const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
			this.previewConnectionEndHandler.handleEndPreviewConnection,
		);

		const pointerStrategy = this.previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy;

		return pointerStrategy;
	}
}
