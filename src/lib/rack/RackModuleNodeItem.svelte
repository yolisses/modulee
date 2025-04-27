<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
	const inputs = ['attack', 'decay', 'sustain', 'release'];
</script>

<div class="rounded border-1 border-white/10 p-2">
	{moduleNode.targetModule?.name}
	<div>
		{#each inputs as input}
			<label class="panel-grid grid gap-1">
				<div>{input}</div>
				<input type="range" />
				<input type="text" value={0.2} class="text-center" />
			</label>
		{/each}
	</div>
</div>

<style lang="postcss">
	.panel-grid {
		grid-template-columns: auto 8rem 2rem;
	}
</style>
