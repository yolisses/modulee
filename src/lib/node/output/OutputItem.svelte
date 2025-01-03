<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { createId } from '$lib/utils/createId';
	import { SetInputConnectedOutput } from '../commands/SetInputConnectedOutput';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Input } from '../input/Input.svelte';
	import type { PreviewConnection } from '../input/PreviewConnection';
	import type { Output } from './Output.svelte';

	interface Props {
		space: Space;
		output: Output;
		editor: Editor;
	}
	let { space, output, editor }: Props = $props();

	function handlePreviewEnd(previewConnection: PreviewConnection) {
		const { endConnector } = previewConnection;

		if (endConnector instanceof Input && endConnector.connectedOutput !== output) {
			const command = new SetInputConnectedOutput({
				id: createId(),
				type: 'SetInputConnectedOutput',
				details: { inputId: endConnector.id, outputId: output.id },
			});
			editor.execute(command);
		}
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	<ConnectorItem
		onPreviewEnd={handlePreviewEnd}
		{space}
		connector={output}
		targetClass={Input}
		class="flex-row-reverse"
	/>
</div>
