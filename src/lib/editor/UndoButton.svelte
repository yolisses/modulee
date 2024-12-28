<script lang="ts">
	import type { Editor } from './Editor.svelte';

	const { editor }: { editor: Editor } = $props();

	function handleClick() {
		editor.undo();
	}
</script>

<button onclick={handleClick} disabled={!editor.getCanUndo()}> undo </button>
