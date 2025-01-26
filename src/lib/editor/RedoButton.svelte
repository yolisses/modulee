<script lang="ts">
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Editor } from './Editor.svelte';

	const { editor }: { editor: Editor } = $props();

	function handleClick() {
		editor.redo();
	}
</script>

<button onclick={handleClick} disabled={!editor.getCanRedo()} class="common-button">
	<Fa icon={faRedo} />
</button>
