import { Input } from '$lib/data/Input.svelte';
import { Output } from '$lib/data/Output.svelte';
import { getEditorContext } from '$lib/editor/editorContext';
import type { ConnectionCondition } from 'nodes-editor';

// TODO Find a better name for this
export class ConnectorCondition {
	editorContext = getEditorContext();

	endConnectorCondition: ConnectionCondition = ({ endConnectorId, startConnectorId }) => {
		if (endConnectorId === startConnectorId) return false;

		const { editor } = this.editorContext;
		const endConnector = editor.connectors.getOrNull(endConnectorId);
		const startConnector = editor.connectors.getOrNull(startConnectorId);

		if (startConnector instanceof Input && endConnector instanceof Input) return false;
		if (startConnector instanceof Output && endConnector instanceof Output) return false;
		return true;
	};
}
