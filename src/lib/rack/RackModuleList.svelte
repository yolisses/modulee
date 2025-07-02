<script lang="ts">
	import { expandById } from '$lib/array/expandById';
	import { ReorderEffectCommand } from '$lib/commands/externalModule/ReorderEffectCommand';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { onMount } from 'svelte';
	import { CHAIN_DIVISION_PREFIX } from './CHAIN_DIVISION_PREFIX';
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
	const idChains = $derived(getChains(getAudioTopologicalMap(moduleNodes)));
	const chains = $derived(idChains.map((idChain) => expandById(moduleNodes, idChain)));

	type Item = { type: 'division'; id: string } | { type: 'node'; id: string; node: ModuleNode };

	function getNodeItem(node: ModuleNode): Item {
		return {
			node,
			id: node.id,
			type: 'node',
		};
	}

	function createDivisionItem(): Item {
		return {
			type: 'division' as const,
			id: CHAIN_DIVISION_PREFIX + createId(),
		};
	}

	const itemsWithEndDivision: Item[] = $derived(
		chains.map((chain) => [...chain.map(getNodeItem), createDivisionItem()]).flat(),
	);
	const items = $derived(itemsWithEndDivision.slice(0, itemsWithEndDivision.length - 1));

	function getIsDivision(id: string) {
		return id.startsWith(CHAIN_DIVISION_PREFIX);
	}

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
		if (nextModuleNodeId && !getIsDivision(nextModuleNodeId)) {
			direction = 'before';
			referenceNodeId = nextModuleNodeId;
		} else if (previousModuleNodeId && !getIsDivision(previousModuleNodeId)) {
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
	{#each items as item (item.id)}
		{#if item.type === 'node'}
			<RackModuleNodeItem moduleNode={item.node} />
		{:else}
			<ChainDivision id={item.id} />
		{/if}
	{/each}
</div>
