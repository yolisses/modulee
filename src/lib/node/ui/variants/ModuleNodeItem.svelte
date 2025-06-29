<script lang="ts">
	import {
		default as SetModuleReferenceButton,
		default as SetTargetInternalModuleButton,
	} from '$lib/module/internalModule/SetModuleReferenceButton.svelte';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte.js';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ModuleReferenceButton from '../ModuleReferenceButton.svelte';
	import BaseNodeItem from './BaseNodeItem.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<BaseNodeItem node={moduleNode}>
	{#snippet preInputsChildren()}
		{#if moduleNode.targetModule}
			<div class="hover-bg flex w-full flex-row">
				<ModuleReferenceButton module={moduleNode.targetModule} />
				<SetTargetInternalModuleButton moduleNodeId={moduleNode.id}>
					<Fa icon={faEdit} title="Replace module" style="padding-inline: 0.25lh;" />
				</SetTargetInternalModuleButton>
			</div>
		{:else}
			<SetModuleReferenceButton moduleNodeId={moduleNode.id}>
				<div class="opacity-50" style:padding-inline="0.25lh">Set module</div>
			</SetModuleReferenceButton>
		{/if}
	{/snippet}
</BaseNodeItem>
