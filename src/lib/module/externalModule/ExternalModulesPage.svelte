<script lang="ts">
	import { getUserDataContext } from '$lib/user/userDataContext';
	import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import InfiniteList from './InfiniteList.svelte';
	import { Loader } from './Loader.svelte';

	let text = $state('');
	let sort = $state('');
	let group = $state('');
	let form: HTMLFormElement;
	const userDataContext = getUserDataContext();

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();
		queryParams.append('text', text);
		queryParams.append('sort', sort);
		if (group === 'liked') {
			queryParams.append('likedBy', userDataContext.userData.id);
		}
		if (loader.cursor) queryParams.append('cursor', loader.cursor);
		const path = `/api/externalModules?${queryParams.toString()}`;
		return path;
	}
	const loader = new Loader(getPath);

	const title = 'External modules';
</script>

<svelte:head>
	<title>{title} - Modulee</title>
</svelte:head>

<div class="flex flex-1 flex-row overflow-hidden">
	<div class="border-r-2 border-black/50 p-4">
		<form
			action=""
			method="get"
			bind:this={form}
			class="flex flex-col gap-2"
			onreset={loader.handleReset}
			onsubmit={loader.handleSubmit}
			onchange={loader.handleSubmit}
		>
			<label class="flex flex-col">
				Text
				<input bind:value={text} type="text" class="common-input" name="text" />
			</label>
			<label class="flex flex-col">
				Sort by
				<select bind:value={sort} class="common-input" name="sort">
					<option class="bg-zinc-800" value=""></option>
					<option class="bg-zinc-800" value="likeCount">Likes</option>
					<option class="bg-zinc-800" value="createdAt">Most recent</option>
				</select>
			</label>
			<div>
				<div class="flex flex-row gap-2">
					<label class="common-button">
						<input id="effect" type="radio" value="all" bind:group />
						All
					</label>
					<label class="common-button">
						<input type="radio" id="instrument" value="liked" bind:group />
						Liked
					</label>
					<label class="common-button">
						<input type="radio" id="utility" value="used" bind:group />
						Used in project
					</label>
				</div>
			</div>
			<div class="mt-2 flex flex-row items-end justify-end gap-2">
				<button type="reset" class="common-button">
					<Fa fw icon={faEraser} />
					Clear
				</button>
				<button type="submit" class="primary-button">
					<Fa fw icon={faSearch} />
					Search
				</button>
			</div>
		</form>
	</div>
	<div class="flex-1 overflow-auto">
		<div class="flex h-[100dvh] flex-col items-center">
			<div class="flex w-full max-w-xl flex-col gap-4 p-4">
				<h1 class="py-2 text-xl font-medium">{title}</h1>
				<InfiniteList {loader}>
					{#snippet children(externalModuleData: ExternalModuleData)}
						<ExternalModuleItem {externalModuleData} />
					{/snippet}
				</InfiniteList>
			</div>
		</div>
	</div>
</div>
