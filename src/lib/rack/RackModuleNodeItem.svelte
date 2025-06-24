<script lang="ts">
	import { AudioInputNode } from '$lib/data/AudioInputNode.svelte';
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { ModuleNodeInput } from '$lib/data/ModuleNodeInput';
	import RackInputItem from './RackInputItem.svelte';
	import RackModuleNodeItemDotsMenuButton from './RackModuleNodeItemDotsMenuButton.svelte';

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

<div class="max-w-xs grow rounded border-1 border-white/10 p-2 select-none">
	<div class="flex flex-row items-center justify-between">
		<div class="sortable-handle grow">
			{moduleNode.targetModule?.name}
		</div>
		<RackModuleNodeItemDotsMenuButton {moduleNode} />
	</div>
	<div>
		{#each inputs as input}
			<RackInputItem {input} />
		{/each}
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	:global(.sortable-ghost) {
		@apply border border-white/50;
	}
</style>
