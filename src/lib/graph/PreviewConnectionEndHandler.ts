import { DisconnectCommand } from '$lib/commands/connection/DisconnectCommand';
import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import type { Input } from '$lib/input/Input';
import { addNodeMenuParamsContextKey } from '$lib/node/add/addNodeMenuParamsContext';
import { getInputAndOutput } from '$lib/node/getInputAndOutput';
import { NODE_ITEM_WIDTH } from '$lib/node/NODE_ITEM_WIDTH';
import type { Output } from '$lib/node/Output';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import { Vector, type EndPreviewConnectionEvent } from 'nodes-editor';

export class PreviewConnectionEndHandler {
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);
	editorContext = getRequiredContext(editorContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	spaceContext = getRequiredContext(spaceContextKey);

	public handleEndPreviewConnection = (e: EndPreviewConnectionEvent) => {
		const { input, output } = getInputAndOutput(e);

		if (input && output) {
			this.connectNode(input, output);
		} else {
			if (input) {
				this.disconnectNode(input);
			}
			this.showAddNodeMenu(e);
		}
	};

	connectNode(input: Input, output: Output) {
		const command = new SetConnectionCommand({
			createdAt: new Date().toJSON(),
			details: {
				connection: {
					id: createId(),
					inputPath: input.inputPath,
					targetNodeId: output?.node.id,
				},
			},
			id: createId(),
			projectId: this.projectDataContext.projectData.id,
			type: 'SetConnectionCommand',
		});
		this.editorContext.editor.execute(command);
	}

	disconnectNode(input: Input) {
		const command = new DisconnectCommand({
			createdAt: new Date().toJSON(),
			details: { inputPath: input.inputPath },
			id: createId(),
			projectId: this.projectDataContext.projectData.id,
			type: 'DisconnectCommand',
		});
		this.editorContext.editor.execute(command);
	}

	showAddNodeMenu(e: EndPreviewConnectionEvent) {
		let dataPosition = this.spaceContext.space.getDataPosition(e.mousePosition);
		dataPosition = dataPosition.subtract(new Vector(NODE_ITEM_WIDTH - 1, 0));
		const { input, output } = getInputAndOutput(e);
		this.addNodeMenuParamsContext.addNodeMenuParams = { input, output, position: dataPosition };
	}
}
