<script lang="ts">
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getIsSomeModuleNode } from './getIsSomeModuleNode';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-row gap-2 self-center">
		<button class="common-button">
			<Fa icon={faChevronDown} fw />
		</button>
		<h2 class="py-2 text-lg">{internalModule.name}</h2>
		<div class="flex-1"></div>
		<button class="common-button">
			<Fa icon={faPlus} />
			Add effect
		</button>
	</div>
	<div class="flex flex-row flex-wrap justify-center gap-1">
		{#each internalModule.nodes.filter(getIsSomeModuleNode) as moduleNode}
			<RackModuleNodeItem {moduleNode} />
		{/each}
	</div>
</div>
