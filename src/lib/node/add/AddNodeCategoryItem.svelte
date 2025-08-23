<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getType } from '$lib/ui/getType';
	import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import type { NodeDefinitionCategory } from '../definitions/NodeDefinitionCategory';
	import { AddNodeHandler } from './AddNodeHandler';
	import { getCanNodeBeCreated } from './getCanNodeBeCreated';

	interface Props {
		nodeDefinitionCategory: NodeDefinitionCategory;
	}

	let floating: HTMLElement;
	let reference: HTMLElement;
	const addNodeHandler = new AddNodeHandler();
	const { nodeDefinitionCategory }: Props = $props();

	function updatePosition() {
		computePosition(reference, floating, {
			strategy: 'fixed',
			placement: 'right',
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			Object.assign(floating.style, { top: y + 'px', left: x + 'px' });
		});
	}

	$effect(() => {
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
			items={nodeDefinitionCategory.nodeDefinitions.filter(getCanNodeBeCreated)}
			onClick={addNodeHandler.handleNodeDefinitionSelect}
		/>
	</div>
</div>
