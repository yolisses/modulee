import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import { findInputDataInNodesData } from './utils/findInputDataInNodesData';

export class SetInputConnectedOutput extends Command<{
	inputId: string;
	outputId?: string;
}> {
	previousConnectedOutputId?: string;

	execute(editorData: EditorData): void {
		const input = findInputDataInNodesData(this.details.inputId, editorData.nodes);
		this.previousConnectedOutputId = input.connectedOutputId;
		input.connectedOutputId = this.details.outputId;
	}

	undo(editorData: EditorData): void {
		const input = findInputDataInNodesData(this.details.inputId, editorData.nodes);
		input.connectedOutputId = this.previousConnectedOutputId;
	}
}
