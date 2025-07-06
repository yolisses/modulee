import { editorContextKey } from '$lib/editor/editorContext';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { addNodeMenuParamsContextKey } from '$lib/node/add/addNodeMenuParamsContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import {
	previewConnectionContextKey,
	PreviewConnectionPointerStrategy,
	SelectionBoxPointerStrategy,
} from 'nodes-editor';
import { graphContextKey } from './graphContext';
import { PreviewConnectionEndHandler } from './PreviewConnectionEndHandler';

export class GraphCanvasPointerStrategyFactory {
	graphContext = getRequiredContext(graphContextKey);
	spaceContext = getRequiredContext(spaceContextKey);
	editorContext = getRequiredContext(editorContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);
	previewConnectionEndHandler: PreviewConnectionEndHandler;

	constructor() {
		this.previewConnectionEndHandler = new PreviewConnectionEndHandler();
	}

	getPointerStrategy() {
		const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy((e) => {
			// Ignore mouse right button
			return e.button !== 2;
		});
		const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
			this.previewConnectionEndHandler.handleEndPreviewConnection,
		);

		const pointerStrategy = this.previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy;

		return pointerStrategy;
	}
}
