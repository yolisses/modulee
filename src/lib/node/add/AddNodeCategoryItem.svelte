<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getType } from '$lib/ui/getType';
	import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import type { NodeDefinitionCategory } from '../definitions/NodeDefinitionCategory';
	import { handleNodeDefinitionSelect } from './handleNodeDefinitionSelect';

	interface Props {
		nodeDefinitionCategory: NodeDefinitionCategory;
	}

	let floating = $state<HTMLElement>();
	let reference = $state<HTMLElement>();
	const { nodeDefinitionCategory }: Props = $props();

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
		class="scroll-small menu-container fixed z-10 hidden w-max min-w-32 overflow-auto overscroll-contain group-hover:flex"
	>
		<BasicList
			getId={getType}
			getName={getNodeDefinitionName}
			onClick={handleNodeDefinitionSelect}
			items={nodeDefinitionCategory.nodeDefinitions}
		/>
	</div>
</div>
