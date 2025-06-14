<script lang="ts">
	import CloseButton from '$lib/module/externalModule/CloseButton.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		badges?: Snippet;
		sideBar?: Snippet;
		children?: Snippet;
		topChildren?: Snippet;
	}

	const { title, children, topChildren, badges, sideBar }: Props = $props();
</script>

<svelte:head>
	<title>{title} - Modulee</title>
</svelte:head>

<div class="flex flex-row border-b-2 border-black/50">
	<h1 class="px-2 py-2 text-xl font-medium">{title}</h1>
	{@render badges?.()}
	<div class="flex flex-1"></div>
	{@render topChildren?.()}
	<CloseButton />
</div>
<div class="flex flex-1 flex-row overflow-hidden">
	{#if sideBar}
		<div class="border-r-2 border-black/50 p-4">
			{@render sideBar()}
		</div>
	{/if}
	<div class="flex-1 overflow-auto">
		<div class="flex h-[100dvh] flex-col items-center">
			<div class="flex w-full max-w-xl flex-col gap-4 p-2">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>
