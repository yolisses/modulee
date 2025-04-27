<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import RackInputItem from './RackInputItem.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<div class="rounded border-1 border-white/10 p-2">
	{moduleNode.targetModule?.name}
	<div class="panel-grid grid gap-1">
		{#each moduleNode.inputs as input}
			<RackInputItem {input} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.panel-grid {
		grid-template-columns: auto 8rem 2rem;
	}
</style>
