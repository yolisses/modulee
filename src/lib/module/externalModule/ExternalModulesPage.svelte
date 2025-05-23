<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faEraser, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import { Loader } from './Loader.svelte';

	let text = $state('');
	let sort = $state('');

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();
		queryParams.append('text', text);
		queryParams.append('sort', sort);
		if (loader.cursor) queryParams.append('cursor', loader.cursor);
		const path = `/api/externalModules?${queryParams.toString()}`;
		return path;
	}
	const loader = new Loader(getPath);

	onMount(loader.initialize);
	$effect(() => {
		loader.onChange();
	});
</script>

<ListPageLayout title="External modules">
	<form
		action=""
		method="get"
		class="flex flex-col gap-2"
		onreset={loader.handleReset}
		onsubmit={loader.handleSubmit}
	>
		<div class="flex flex-row items-end gap-2">
			<label class="flex flex-1 flex-col">
				Text
				<input bind:value={text} type="text" class="common-input" name="text" />
			</label>
			<label class="flex flex-col">
				Sort by
				<select bind:value={sort} class="common-input" name="sort">
					<option class="bg-zinc-800" value=""></option>
					<option class="bg-zinc-800" value="likeCount">Likes</option>
					<option class="bg-zinc-800" value="usageCount">Usage</option>
					<option class="bg-zinc-800" value="updatedAt">Last update</option>
				</select>
			</label>
		</div>
		<div class="flex flex-row gap-2">
			<button type="submit" class="primary-button">
				<Fa fw icon={faSearch} />
				Search
			</button>
			<button type="reset" class="common-button">
				<Fa fw icon={faEraser} />
				Clear
			</button>
		</div>
	</form>

	{#if loader.items?.length}
		<div>
			{#each loader.items as externalModuleData}
				<ExternalModuleItem {externalModuleData} />
			{/each}
		</div>
	{/if}

	{#if !loader.isLoading && loader.items?.length === 0}
		<div class="text-center">No external modules found</div>
	{:else if loader.finished}
		<div class="text-center opacity-50">End of the list</div>
	{/if}

	{#if loader.gotError}
		<div class="flex flex-col items-center">
			<div class="text-red-500">Error loading</div>
			<button class="common-button">
				<Fa fw icon={faRefresh} />
				Try again
			</button>
		</div>
	{/if}
	{#if loader.isLoading}
		<div class="flex flex-col items-center">
			<Spinner />
		</div>
	{/if}

	<div bind:this={loader.listEnd}></div>
</ListPageLayout>
