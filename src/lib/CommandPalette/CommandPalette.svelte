<script lang="ts">
	import type { CommandClass } from '$lib/commands/CommandClass';
	import { commandClasses } from '$lib/commands/commandClasses';
	import { commandNames } from '$lib/commands/commandNames';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getSame } from '$lib/ui/getSame';
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';

	interface Props {
		isActive: boolean;
	}

	let text = $state<string>('');
	let div = $state<HTMLElement>();
	let { isActive = $bindable() }: Props = $props();

	const values = $derived(
		commandClasses.filter((commandClass) => getName(commandClass).includes(text)),
	);

	function getName(commandClass: CommandClass) {
		return commandNames[commandClass.name];
	}

	function handleClick() {}

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = div?.contains(e.target as Node);
		if (!clickedInside) {
			isActive = false;
		}
	}
</script>

<div
	bind:this={div}
	class="fixed left-0 right-0 top-0 m-auto flex max-h-[75vh] max-w-sm flex-col gap-2 rounded border border-black bg-zinc-800 p-2"
>
	<input type="text" bind:value={text} class="rounded border border-white/20 bg-transparent p-2" />
	<div class="overflow-auto">
		{#if values.length}
			<BasicList {values} getId={getSame} {getName} onClick={handleClick} />
		{:else}
			<div class="opacity-50">No results found</div>
		{/if}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} />
