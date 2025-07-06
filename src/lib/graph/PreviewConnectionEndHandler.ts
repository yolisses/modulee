import { DisconnectCommand } from '$lib/commands/connection/DisconnectCommand';
import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import type { InputPath } from '$lib/input/InputPath';
import { addNodeMenuParamsContextKey } from '$lib/node/add/addNodeMenuParamsContext';
import { getInputAndOutput } from '$lib/node/getInputAndOutput';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import { type EndPreviewConnectionEvent } from 'nodes-editor';

export class PreviewConnectionEndHandler {
	spaceContext = getRequiredContext(spaceContextKey);
	editorContext = getRequiredContext(editorContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);

	public handleEndPreviewConnection = (e: EndPreviewConnectionEvent) => {
		const { input, output } = getInputAndOutput(e);
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

			const screenPosition = e.mousePosition;
			const dataPosition = this.spaceContext.space.getDataPosition(screenPosition);
			this.addNodeMenuParamsContext.addNodeMenuParams = {
				input,
				position: dataPosition,
			};
		}
	};
}
