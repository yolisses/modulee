<script lang="ts">
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { faChevronDown, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getIsSomeModuleNode } from './getIsSomeModuleNode';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
	let open = $state(true);

	function handleClick() {
		open = !open;
	}
</script>

<details bind:open class="flex flex-col items-center" class:mb-2={open}>
	<summary class="flex w-full max-w-xl flex-row gap-2 self-center border-t border-white/10">
		<button class="common-button" onclick={handleClick}>
			<Fa icon={open ? faChevronDown : faChevronRight} fw />
		</button>
		<h2 class="py-2 text-lg">{internalModule.name}</h2>
		<div class="flex-1"></div>
		<button class="common-button">
			<Fa icon={faPlus} />
			Add effect
		</button>
	</summary>

	<div class="flex flex-row flex-wrap justify-center gap-1 pt-1">
		{#each internalModule.nodes.filter(getIsSomeModuleNode) as moduleNode}
			<RackModuleNodeItem {moduleNode} />
		{/each}
	</div>
</details>

<style lang="postcss">
	details:first-child summary {
		@apply border-none;
	}
</style>
