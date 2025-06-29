<script lang="ts">
	import type { InternalModule } from '$lib/module/internalModule/InternalModule';
	import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AddOutputNodeButton from './AddOutputNodeButton.svelte';
	import { getRackModuleItemModuleNodes } from './getRackModuleItemModuleNodes';
	import RackAddEffectButton from './RackAddEffectButton.svelte';
	import RackModuleList from './RackModuleList.svelte';

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
		<RackModuleList {moduleNodes} />
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
