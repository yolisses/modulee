<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte.js';
	import SetTargetInternalModuleButton from '../../internalModule/SetTargetInternalModuleButton.svelte';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import TargetInternalModuleButton from '../TargetInternalModuleButton.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<BaseNodeItem node={moduleNode}>
	{#snippet preInputsChildren()}
		{#if moduleNode.targetInternalModule}
			<TargetInternalModuleButton
				{moduleNode}
				targetInternalModule={moduleNode.targetInternalModule}
			/>
		{:else}
			<SetTargetInternalModuleButton moduleNodeId={moduleNode.id}>
				<div class="opacity-50" style:padding-inline="0.25lh">Set internalModule</div>
			</SetTargetInternalModuleButton>
		{/if}
	{/snippet}
</BaseNodeItem>
