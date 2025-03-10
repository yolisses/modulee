<script lang="ts">
	import type { InternalModuleNode } from '$lib/data/InternalModuleNode.svelte.js';
	import SetTargetInternalModuleButton from '../../internalModule/SetTargetInternalModuleButton.svelte';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import TargetInternalModuleButton from '../TargetInternalModuleButton.svelte';

	interface Props {
		internalModuleNode: InternalModuleNode;
	}

	const { internalModuleNode }: Props = $props();
</script>

<BaseNodeItem node={internalModuleNode}>
	{#snippet preInputsChildren()}
		{#if internalModuleNode.targetInternalModule}
			<TargetInternalModuleButton
				{internalModuleNode}
				targetInternalModule={internalModuleNode.targetInternalModule}
			/>
		{:else}
			<SetTargetInternalModuleButton internalModuleNodeId={internalModuleNode.id}>
				<div class="opacity-50" style:padding-inline="0.25lh">Set internalModule</div>
			</SetTargetInternalModuleButton>
		{/if}
	{/snippet}
</BaseNodeItem>
