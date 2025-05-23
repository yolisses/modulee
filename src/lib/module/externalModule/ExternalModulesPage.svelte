<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import InfiniteList from './InfiniteList.svelte';
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
	<InfiniteList {loader} {getPath}>
		{#snippet children(externalModuleData: ExternalModuleData)}
			<ExternalModuleItem {externalModuleData} />
		{/snippet}
	</InfiniteList>
</ListPageLayout>
