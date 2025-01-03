<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { createId } from '$lib/utils/createId';
	import { SetInputConnectedOutput } from '../commands/SetInputConnectedOutput';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';
	import InputItemWire from './InputItemWire.svelte';
	import type { PreviewConnection } from './PreviewConnection';

	interface Props {
		space: Space;
		input: Input;
		editor: Editor;
	}
	let { space, input, editor }: Props = $props();

	function handlePreviewEnd(previewConnection: PreviewConnection) {
		const { endConnector } = previewConnection;
		if (
			input.connectedOutput !== endConnector &&
			(endConnector instanceof Output || endConnector === undefined)
		) {
			const command = new SetInputConnectedOutput({
				id: createId(),
				type: 'SetInputConnectedOutput',
				details: { inputId: input.id, outputId: endConnector?.id },
			});
			editor.execute(command);
		}
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	{#if input.connectedOutput}
		<InputItemWire {input} {space} output={input.connectedOutput} />
	{/if}
	<ConnectorItem onPreviewEnd={handlePreviewEnd} {space} connector={input} targetClass={Output} />
</div>
