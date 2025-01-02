<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import type { Input } from './Input.svelte';
	import InputItem from './InputItem.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		inputs: Input[];
	}

	let { space, inputs, editor }: Props = $props();
</script>

{#each inputs as input (input.id)}
	<InputItem {space} {input} {editor} />
{/each}
