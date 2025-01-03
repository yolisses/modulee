<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import type { Output } from './Output.svelte';
	import OutputItem from './OutputItem.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		outputs: Output[];
	}

	let { space, editor, outputs }: Props = $props();
</script>

{#each outputs as output (output.id)}
	<OutputItem {editor} {space} {output} />
{/each}
