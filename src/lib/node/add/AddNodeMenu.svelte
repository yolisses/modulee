<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { computePosition, flip, shift } from '@floating-ui/dom';
	import { onMount } from 'svelte';
	import AddNodeCategoryItems from './AddNodeCategoryItems.svelte';
	import { addNodeMenuParamsContextKey } from './addNodeMenuParamsContext';
	import AddNodeMenuSearchInput from './AddNodeMenuSearchInput.svelte';
	import AddNodeSearchNodeItems from './AddNodeSearchNodeItems.svelte';

	interface Props {
		floatingMenuReference: HTMLElement;
	}

	const { floatingMenuReference }: Props = $props();

	let searchText = $state('');

	let menu: HTMLElement;
	const addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);

	function handleWindowClick(e: MouseEvent) {
		const clickedInside = menu?.contains(e.target as Node);
		if (!clickedInside) {
			addNodeMenuParamsContext.addNodeMenuParams = undefined;
		}
	}

	onMount(() => {
		computePosition(floatingMenuReference, menu, {
			placement: 'right',
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			Object.assign(menu.style, { top: y + 'px', left: x + 'px' });
		});
	});
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div class="menu-container absolute flex flex-col" bind:this={menu}>
	<AddNodeMenuSearchInput bind:searchText />
	<div
		class="scroll-small flex flex-col overflow-auto overscroll-contain whitespace-nowrap select-none"
	>
		{#if searchText}
			<AddNodeSearchNodeItems {searchText} />
		{:else}
			<AddNodeCategoryItems />
		{/if}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} />
