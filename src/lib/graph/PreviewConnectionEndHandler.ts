import { DisconnectCommand } from '$lib/commands/connection/DisconnectCommand';
import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import type { Input } from '$lib/input/Input';
import type { InputPath } from '$lib/input/InputPath';
import { addNodeMenuParamsContextKey } from '$lib/node/add/addNodeMenuParamsContext';
import { getInputAndOutput } from '$lib/node/getInputAndOutput';
import { NODE_ITEM_WIDTH } from '$lib/node/NODE_ITEM_WIDTH';
import type { Output } from '$lib/node/Output';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import { Vector, type EndPreviewConnectionEvent } from 'nodes-editor';

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
			this.connectNode(inputPath, output);
		} else {
			this.disconnectNode(inputPath);
			this.showAddNodeMenu(input, e.mousePosition);
		}
	};

	connectNode(inputPath: InputPath, output: Output) {
		const command = new SetConnectionCommand({
			createdAt: new Date().toJSON(),
			details: {
				connection: {
					id: createId(),
					inputPath,
					targetNodeId: output?.node.id,
				},
			},
			id: createId(),
			projectId: this.projectDataContext.projectData.id,
			type: 'SetConnectionCommand',
		});
		this.editorContext.editor.execute(command);
	}

	disconnectNode(inputPath: InputPath) {
		const command = new DisconnectCommand({
			createdAt: new Date().toJSON(),
			details: {
				inputPath,
			},
			id: createId(),
			projectId: this.projectDataContext.projectData.id,
			type: 'DisconnectCommand',
		});
		this.editorContext.editor.execute(command);
	}

	showAddNodeMenu(input: Input, screenPosition: Vector) {
		let dataPosition = this.spaceContext.space.getDataPosition(screenPosition);
		dataPosition = dataPosition.subtract(new Vector(NODE_ITEM_WIDTH - 1, 0));
		this.addNodeMenuParamsContext.addNodeMenuParams = {
			input,
			position: dataPosition,
		};
	}
}
