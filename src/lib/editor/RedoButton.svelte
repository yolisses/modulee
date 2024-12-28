<script lang="ts">
	import type { Editor } from './Editor.svelte';

	const { editor }: { editor: Editor } = $props();

	function handleClick() {
		editor.redo();
	}
</script>

<button onclick={handleClick} disabled={!editor.getCanRedo()}> redo </button>
