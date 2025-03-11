<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte.js';
	import SetModuleReferenceButton from '$lib/internalModule/SetModuleReferenceButton.svelte';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import ModuleReferenceButton from '../ModuleReferenceButton.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<BaseNodeItem node={moduleNode}>
	{#snippet preInputsChildren()}
		{#if moduleNode.module}
			<ModuleReferenceButton {moduleNode} module={moduleNode.module} />
		{:else}
			<SetModuleReferenceButton moduleNodeId={moduleNode.id}>
				<div class="opacity-50" style:padding-inline="0.25lh">Set module</div>
			</SetModuleReferenceButton>
		{/if}
	{/snippet}
</BaseNodeItem>
