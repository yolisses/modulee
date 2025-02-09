import { Input } from '$lib/data/Input.svelte';
import { Output } from '$lib/data/Output.svelte';
import { getEditorContext } from '$lib/editor/editorContext';

// TODO Find a better name for this
export class ConnectorCondition {
	editorContext = getEditorContext();

	endConnectorCondition = (endConnectorId: string, startConnectorId: string) => {
		if (endConnectorId === startConnectorId) return false;

		const { editor } = this.editorContext;
		const endConnector = editor.connections.get(endConnectorId);
		const startConnector = editor.connections.get(startConnectorId);

		if (startConnector instanceof Input && endConnector instanceof Input) return false;
		if (startConnector instanceof Output && endConnector instanceof Output) return false;
		return true;
	};
}
