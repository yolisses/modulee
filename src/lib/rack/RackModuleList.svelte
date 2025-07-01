<script lang="ts">
	import { expandById } from '$lib/array/expandById';
	import { ReorderEffectCommand } from '$lib/commands/externalModule/ReorderEffectCommand';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { onMount } from 'svelte';
	import { CHAIN_DIVISION_ID } from './CHAIN_DIVISION_ID';
	import ChainDivision from './ChainDivision.svelte';
	import { getAudioTopologicalMap } from './getAudioTopologicalMap';
	import { getChains } from './getChains';
	import { hideDraggingImage } from './hideDraggingImage';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		moduleNodes: ModuleNode[];
	}

	let sortable: Sortable;
	let element = $state<HTMLElement>();
	// moduleNodes have to be topologically sorted
	const { moduleNodes }: Props = $props();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	const idChains = getChains(getAudioTopologicalMap(moduleNodes));
	const chains = idChains.map((idChain) => expandById(moduleNodes, idChain));

	function handleSort(e: SortableEvent) {
		const { oldIndex, newIndex } = e;

		if (oldIndex === newIndex) return;
		if (oldIndex === undefined) return;
		if (newIndex === undefined) return;

		let referenceNodeId;
		let direction: 'before' | 'after';

		const order = sortable.toArray();
		const nextModuleNodeId = order[newIndex + 1];
		const previousModuleNodeId = order[newIndex - 1];
		if (nextModuleNodeId && nextModuleNodeId !== CHAIN_DIVISION_ID) {
			direction = 'before';
			referenceNodeId = nextModuleNodeId;
		} else if (previousModuleNodeId && previousModuleNodeId !== CHAIN_DIVISION_ID) {
			direction = 'after';
			referenceNodeId = previousModuleNodeId;
		} else {
			return;
		}

		const command = new ReorderEffectCommand({
			id: createId(),
			type: 'ReorderEffectCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				direction,
				referenceNodeId,
				newConnectionId: createId(),
				moduleNodeId: order[newIndex],
			},
		});
		console.log(command.details);
		editorContext.editor.execute(command);
	}

	onMount(() => {
		if (element) {
			sortable = new Sortable(element, {
				onEnd: handleSort,
				handle: '.sortable-handle',
				setData: hideDraggingImage,
				ghostClass: 'sortable-ghost',
				dataIdAttr: 'data-sortable-id',
			});
			return () => sortable.destroy();
		}
	});
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 p-1" bind:this={element}>
	{#each chains as chain, index}
		{#each chain as moduleNode (moduleNode.id)}
			<RackModuleNodeItem {moduleNode} />
		{/each}
		{#if index < chains.length - 1}
			<ChainDivision />
		{/if}
	{/each}
</div>
