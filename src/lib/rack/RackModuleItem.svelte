<script lang="ts">
	import type { InternalModule } from '$lib/module/internalModule/InternalModule.svelte';
	import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import AddOutputNodeButton from './AddOutputNodeButton.svelte';
	import { getRackModuleItemModuleNodes } from './getRackModuleItemModuleNodes';
	import { hideDraggingImage } from './hideDraggingImage';
	import RackAddEffectButton from './RackAddEffectButton.svelte';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
	const hasOutputNode = $derived(internalModule.nodes.some((node) => node.type === 'OutputNode'));
	const moduleNodes = $derived(getRackModuleItemModuleNodes(internalModule));
	// svelte-ignore state_referenced_locally
	let open = $state(moduleNodes.length > 0);

	function handleClick() {
		open = !open;
	}

	let element = $state<HTMLElement>();

	onMount(() => {
		if (element) {
			const sortable = new Sortable(element, {
				setData: hideDraggingImage,
				handle: '.sortable-handle',
				ghostClass: 'sortable-ghost',
			});
			return () => sortable.destroy();
		}
	});
</script>

<details bind:open class="flex flex-col" class:mb-2={open}>
	<summary class="flex w-full flex-row gap-2 border-t border-white/10">
		<button class="common-button" onclick={handleClick}>
			<Fa fw icon={open ? faChevronDown : faChevronRight} />
		</button>
		<div class="self-center">{internalModule.name}</div>
		<div class="flex-1"></div>
		{#if hasOutputNode}
			<RackAddEffectButton internalModuleId={internalModule.id} />
		{:else}
			<AddOutputNodeButton {internalModule} />
		{/if}
	</summary>
	{#if moduleNodes.length > 0}
		<div class="flex flex-row flex-wrap justify-center gap-1 p-1" bind:this={element}>
			{#each moduleNodes as moduleNode (moduleNode.id)}
				<RackModuleNodeItem {moduleNode} />
			{/each}
		</div>
	{:else}
		<div class="flex flex-row justify-center p-1">
			<div class="opacity-50">No effects to adjust</div>
		</div>
	{/if}
</details>

<style lang="postcss">
	details:first-child summary {
		@apply border-none;
	}
</style>
