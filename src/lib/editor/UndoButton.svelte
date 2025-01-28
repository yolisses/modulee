<script lang="ts">
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Editor } from './Editor.svelte';

	const { editor }: { editor: Editor } = $props();

	function handleClick() {
		editor.undo();
	}
</script>

<button onclick={handleClick} disabled={!editor.getCanUndo()} class="common-button" title="Undo">
	<Fa icon={faUndo} />
</button>
