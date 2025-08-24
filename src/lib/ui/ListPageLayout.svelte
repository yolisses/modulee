<script lang="ts">
	import CloseButton from '$lib/module/externalModule/CloseButton.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		badges?: Snippet;
		sideBar?: Snippet;
		children?: Snippet;
		topChildren?: Snippet;
		showCloseButton?: boolean;
	}

	const { title, children, topChildren, badges, sideBar, showCloseButton }: Props = $props();
</script>

<svelte:head>
	<title>{title} - Modulee</title>
</svelte:head>

<div class="flex flex-row border-b-2 border-black/50">
	<h1 class="px-2 py-2 text-xl font-medium">{title}</h1>
	{@render badges?.()}
	<div class="flex flex-1"></div>
	{@render topChildren?.()}
	{#if showCloseButton}
		<CloseButton />
	{/if}
</div>

<div class="flex flex-1 max-md:flex-col max-md:overflow-auto md:flex-row md:overflow-hidden">
	{#if sideBar}
		<div class="border-black/50 p-4 max-md:border-b-2 md:overflow-auto md:border-r-2">
			{@render sideBar()}
		</div>
	{/if}
	<div class="flex flex-1 flex-col items-center md:overflow-auto">
		<div class="flex w-full max-w-xl grow flex-col gap-2 p-2">
			{@render children?.()}
		</div>
	</div>
</div>
