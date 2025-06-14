<script lang="ts">
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModuleItem from '$lib/module/externalModule/ExternalModuleItem.svelte';
	import InfiniteList from '$lib/module/externalModule/InfiniteList.svelte';
	import { Loader } from '$lib/module/externalModule/Loader.svelte';

	interface Props {
		userId: string;
	}

	type Group = 'created' | 'liked';
	const { userId }: Props = $props();
	let group = $state<Group>('created');

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();

		if (group === 'created') {
			queryParams.append('userId', userId);
			queryParams.append('sort', 'createdAt');
		} else if (group === 'liked') {
			queryParams.append('likedBy', userId);
			// TODO sort by likedAt if group is 'liked'
		}

		if (loader.cursor) queryParams.append('cursor', loader.cursor);
		const path = `/api/externalModules?${queryParams.toString()}`;
		return path;
	}
	const loader = new Loader(getPath);

	$effect(() => {
		// on userId change
		userId;
		group = 'created';
		loader.resetState();
	});
</script>

<div class="flex flex-row">
	<button
		class="horizontal-tab"
		data-tab-selected={group === 'created'}
		onclick={() => {
			group = 'created';
			loader.resetState();
		}}
	>
		Created
	</button>
	<button
		class="horizontal-tab"
		data-tab-selected={group === 'liked'}
		onclick={() => {
			group = 'liked';
			loader.resetState();
		}}
	>
		Liked
	</button>
</div>
<hr class="opacity-10" />
<InfiniteList {loader}>
	{#snippet children(externalModuleData: ExternalModuleData)}
		<ExternalModuleItem {externalModuleData} />
	{/snippet}
</InfiniteList>
