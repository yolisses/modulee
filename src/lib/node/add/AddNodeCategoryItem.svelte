<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName';
	import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import type { NodeDefinitionCategory } from '../definitions/NodeDefinitionCategory';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

	interface Props {
		nodeDefinitionCategory: NodeDefinitionCategory;
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	let floating = $state<HTMLElement>();
	let reference = $state<HTMLElement>();
	const { nodeDefinitionCategory, addNodeMenuLogic }: Props = $props();

	function updatePosition() {
		if (!floating) return;
		if (!reference) return;
		computePosition(reference, floating, {
			strategy: 'fixed',
			placement: 'right',
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			if (!floating) return;
			Object.assign(floating.style, { left: `${x}px`, top: `${y}px` });
		});
	}

	$effect(() => {
		if (!floating) return;
		if (!reference) return;
		return autoUpdate(reference, floating, updatePosition);
	});
</script>

<div class="group relative flex flex-col items-stretch">
	<button class="common-button group-hover:bg-white/10" bind:this={reference}>
		<div class="flex-1 text-start">
			{nodeCategoryNames[nodeDefinitionCategory.name]}
		</div>
		<Fa icon={faChevronRight} class="opacity-50" size="xs" />
	</button>
	<div
		bind:this={floating}
		class="menu-container fixed z-10 hidden w-max min-w-32 group-hover:flex"
	>
		<BasicList
			getId={getName}
			getName={getNodeDefinitionName}
			items={nodeDefinitionCategory.nodeDefinitions}
			onClick={addNodeMenuLogic.handleNodeDefinitionSelect}
		/>
	</div>
</div>
