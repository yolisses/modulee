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
import { setIsOverscrollEnabled } from './setIsOverscrollEnabled';

export class GraphCanvasPointerStrategyFactory {
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);
	editorContext = getRequiredContext(editorContextKey);
	graphContext = getRequiredContext(graphContextKey);
	isTouchDevice = $state<boolean>();
	previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	previewConnectionEndHandler: PreviewConnectionEndHandler;
	projectDataContext = getRequiredContext(projectDataContextKey);
	rootElementContext = getRequiredContext(rootElementContextKey);
	selectionBoxPointerStrategy: SelectionBoxPointerStrategy;
	spaceContext = getRequiredContext(spaceContextKey);

	constructor() {
		this.previewConnectionEndHandler = new PreviewConnectionEndHandler();
		onMount(() => {
			this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		});

		function selectionBoxPointerCondition(e: PointerEvent) {
			// Ignore mouse right button, used for adding a node
			return e.button !== 2;
		}

		this.selectionBoxPointerStrategy = new SelectionBoxPointerStrategy(
			this.rootElementContext.rootElement!,
			!!this.isTouchDevice,
			selectionBoxPointerCondition,
		);

		$effect(() => {
			const { rootElement } = this.rootElementContext;
			// Sveltekit doesn't support passing `passive` in a declarative way,
			// since it has super restrict use cases.
			rootElement?.addEventListener('touchend', this.handleTouchEnd, {
				passive: false,
			});
			rootElement?.addEventListener('touchstart', this.handleTouchStart, {
				passive: false,
			});
			rootElement?.addEventListener('touchmove', this.handleTouchMove, {
				passive: false,
			});

			return () => {
				rootElement?.removeEventListener('touchend', this.handleTouchEnd);
				rootElement?.removeEventListener('touchmove', this.handleTouchMove);
				rootElement?.removeEventListener('touchstart', this.handleTouchStart);
			};
		});
	}

	getPointerStrategy() {
		const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
			this.previewConnectionEndHandler.handleEndPreviewConnection,
		);

		const pointerStrategy = this.previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: this.selectionBoxPointerStrategy;

		return pointerStrategy;
	}

	handleTouchStart = (e: TouchEvent) => {
		setIsOverscrollEnabled(true);
		if (this.selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	};

	handleTouchEnd = (e: TouchEvent) => {
		setIsOverscrollEnabled(false);
		if (this.selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	};

	// Maybe it's not required
	handleTouchMove = (e: TouchEvent) => {
		if (this.selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	};
}
