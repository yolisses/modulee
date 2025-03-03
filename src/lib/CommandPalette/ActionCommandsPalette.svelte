<script lang="ts">
	import type { EditorCommandClass } from '$lib/commands/EditorCommandClass';
	import { editorCommandClasses } from '$lib/commands/editorCommandClasses';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getSame } from '$lib/ui/getSame';
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import { getIsCommandPaletteActiveContext } from './isCommandPaletteActiveContext';

	let text = $state<string>('');
	let div = $state<HTMLElement>();
	const isCommandPaletteActiveContext = getIsCommandPaletteActiveContext();

	const values = $derived(
		editorCommandClasses.filter((editorCommandClass) => getName(editorCommandClass).includes(text)),
	);

	function getName(editorCommandClass: EditorCommandClass) {
		return (editorCommandClass as any)[editorCommandClass.name];
	}

	function handleClick() {
		// TODO
	}

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = div?.contains(e.target as Node);
		if (!clickedInside) {
			isCommandPaletteActiveContext.isCommandPaletteActive = false;
		}
	}
</script>

<div
	bind:this={div}
	class="fixed left-0 right-0 top-0 m-auto flex max-h-[75vh] max-w-sm flex-col gap-2 rounded border border-black bg-zinc-800 p-2"
>
	<input type="text" bind:value={text} class="common-input" />
	<div class="overflow-auto">
		{#if values.length}
			<BasicList {values} getId={getSame} {getName} onClick={handleClick} />
		{:else}
			<div class="opacity-50">No results found</div>
		{/if}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} />
