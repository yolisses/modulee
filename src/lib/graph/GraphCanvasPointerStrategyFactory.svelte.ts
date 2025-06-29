import { DisconnectCommand } from '$lib/commands/connection/DisconnectCommand';
import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { createId } from '$lib/data/createId';
import { getEditorContext } from '$lib/editor/editorContext';
import { getGraphContext } from '$lib/graph/graphContext';
import type { InputPath } from '$lib/input/InputPath';
import { getInputAndOutput } from '$lib/node/getInputAndOutput';
import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
import {
	getPreviewConnectionContext,
	PreviewConnectionPointerStrategy,
	SelectionBoxPointerStrategy,
	type EndPreviewConnectionEvent,
} from 'nodes-editor';

export class GraphCanvasPointerStrategyFactory {
	graphContext = getGraphContext();
	editorContext = getEditorContext();
	projectDataContext = getProjectDataContext();
	previewConnectionContext = getPreviewConnectionContext();

	handleEndPreviewConnection = (e: EndPreviewConnectionEvent) => {
		const { input, output } = getInputAndOutput(e, this.graphContext.graph.connectors);
		if (!input) return;

		const inputPath: InputPath = {
			inputKey: input.key,
			nodeId: input.node.id,
		};

		if (output) {
			const command = new SetConnectionCommand({
				id: createId(),
				type: 'SetConnectionCommand',
				createdAt: new Date().toJSON(),
				projectId: this.projectDataContext.projectData.id,
				details: {
					connection: {
						inputPath,
						id: createId(),
						targetNodeId: output?.node.id,
					},
				},
			});
			this.editorContext.editor.execute(command);
		} else {
			const command = new DisconnectCommand({
				id: createId(),
				details: { inputPath },
				type: 'DisconnectCommand',
				createdAt: new Date().toJSON(),
				projectId: this.projectDataContext.projectData.id,
			});
			this.editorContext.editor.execute(command);
		}
	};

	getPointerStrategy() {
		const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy((e) => {
			// Ignore mouse right button
			return e.button !== 2;
		});
		const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
			this.handleEndPreviewConnection,
		);

		const pointerStrategy = this.previewConnectionContext.startConnectorId
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy;

		return pointerStrategy;
	}
}
