<script lang="ts" generics="T">
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faRefresh } from '@fortawesome/free-solid-svg-icons';
	import { onMount, type Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import { Loader } from './Loader.svelte';

	interface Props {
		loader: Loader<T>;
		children: Snippet<[T]>;
		emptyStateButtons?: Snippet;
	}

	const { loader, children, emptyStateButtons }: Props = $props();

	onMount(loader.initialize);
	$effect(() => {
		loader.onChange();
	});
</script>

<div>
	<!-- Items -->
	{#if loader.items?.length}
		<div>
			{#each loader.items as item}
				{@render children(item)}
			{/each}
		</div>
	{/if}

	<!-- Empty -->
	{#if !loader.isLoading}
		{#if loader.items?.length === 0}
			<div class="flex flex-col items-center gap-2">
				<div class="p-2 italic">Nothing to show</div>
				<div>
					{@render emptyStateButtons?.()}
				</div>
			</div>
		{:else if loader.finished}
			<div class="text-center opacity-50">End of the list</div>
		{/if}
	{/if}

	<!-- Error -->
	{#if loader.gotError}
		<div class="flex flex-col items-center">
			<div class="text-red-500">Error loading</div>
			<button class="common-button">
				<Fa fw icon={faRefresh} />
				Try again
			</button>
		</div>
	{/if}

	<!-- Loading -->
	{#if loader.isLoading}
		<div class="flex flex-col items-center">
			<Spinner />
		</div>
	{/if}

	<div bind:this={loader.listEnd}></div>
</div>
