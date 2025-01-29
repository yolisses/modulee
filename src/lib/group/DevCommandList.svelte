<script lang="ts">
	import { getShortString } from '$dev/getShortString';
	import { getEditorContext } from '$lib/editor/editorContext';

	const editorContext = getEditorContext();
</script>

<div>
	{#each editorContext.editor.history as command (command.id)}
		<div class="text-sm">
			<pre>{getShortString(command.id)} {command.commandData.type}</pre>
		</div>
	{/each}
</div>
