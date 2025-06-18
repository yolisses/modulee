<script lang="ts">
	import { AudioInputNode } from '$lib/data/AudioInputNode.svelte';
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { ModuleNodeInput } from '$lib/data/ModuleNodeInput';
	import RackInputItem from './RackInputItem.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();

	// TODO handle connected inputs differently, since the immediate output
	// can't be changed by changing the unconnected input value
	const inputs = $derived(
		moduleNode.inputs.filter((input) => {
			// hide the audio input nodes
			return input instanceof ModuleNodeInput && !(input.inputNode instanceof AudioInputNode);
		}),
	);
</script>

<div class="rounded border-1 border-white/10 p-2">
	{moduleNode.targetModule?.name}
	<div class="panel-grid grid gap-1">
		{#each inputs as input}
			<RackInputItem {input} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.panel-grid {
		grid-template-columns: auto 8rem 2rem;
	}
</style>
