<script lang="ts" generics="T">
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faRefresh } from '@fortawesome/free-solid-svg-icons';
	import { type Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import { Loader } from './Loader.svelte';

	interface Props {
		loader: Loader<T>;
		children: Snippet<[T]>;
		getPath: (loader: Loader<T>) => string;
	}

	const { loader, getPath, children }: Props = $props();
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
	{#if !loader.isLoading && loader.items?.length === 0}
		<div class="text-center">No external modules found</div>
	{:else if loader.finished}
		<div class="text-center opacity-50">End of the list</div>
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
