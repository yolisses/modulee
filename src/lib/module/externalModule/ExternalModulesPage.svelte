<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faEraser, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';

	let text = $state('pets');
	let sort = $state('');
	let cursor = $state<string | null>();
	let externalModulesData = $state<ExternalModuleData[]>();

	let listEnd: HTMLElement;
	let gotError = $state(false);
	let isLoading = $state(false);
	let finished = $state(false);
	let isIntersecting = $state(true);

	async function load() {
		const queryParams = new URLSearchParams();
		queryParams.append('text', text);
		queryParams.append('sort', sort);
		if (cursor) queryParams.append('cursor', cursor);

		const path = `/api/externalModules?${queryParams.toString()}`;
		const res = await fetch(path, { method: 'GET' });

		if (!res.ok) {
			gotError = true;
			return;
		}

		const data = await res.json();
		console.log(data);
		cursor = data.nextCursor;

		if (cursor === null) {
			finished = true;
		}

		if (!externalModulesData) {
			externalModulesData = [];
		}
		externalModulesData?.push(...data.items);
	}

	$effect(() => {
		if (isIntersecting && !gotError && !isLoading && !finished) {
			isLoading = true;
			load().then(() => {
				isLoading = false;
			});
		}
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				isIntersecting = false;
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isIntersecting = true;
					}
				});
			},
			{ rootMargin: '0px 0px 100px 0px' },
		);
		observer.observe(listEnd);
	});

	function resetState() {
		gotError = false;
		finished = false;
		isLoading = false;
		cursor = undefined;
		isIntersecting = true;
		externalModulesData = undefined;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		resetState();
	}

	function handleReset(e: Event) {
		resetState();
	}
</script>

<ListPageLayout title="External modules">
	<form
		action=""
		method="get"
		onreset={handleReset}
		onsubmit={handleSubmit}
		class="flex flex-col gap-2"
	>
		<div class="flex flex-row items-end gap-2">
			<label class="flex flex-1 flex-col">
				Text
				<input bind:value={text} type="text" class="common-input" name="text" />
			</label>
			<label class="flex flex-col">
				Sort by
				<select bind:value={sort} class="common-input" name="sort">
					<option class="bg-zinc-800" value="">Default</option>
					<option class="bg-zinc-800" value="likeCount">Likes</option>
					<option class="bg-zinc-800" value="usageCount">Usage</option>
					<option class="bg-zinc-800" value="updatedAt">Last update</option>
				</select>
			</label>
		</div>
		<div class="flex flex-row gap-2">
			<button type="submit" class="primary-button">
				<Fa icon={faSearch} />
				Search
			</button>
			<button type="reset" class="common-button">
				<Fa icon={faEraser} />
				Clear
			</button>
		</div>
	</form>

	{#if externalModulesData?.length}
		<div>
			{#each externalModulesData as externalModuleData}
				<ExternalModuleItem {externalModuleData} />
			{/each}
		</div>
	{/if}

	{#if !isLoading && externalModulesData?.length === 0}
		<div class="text-center">No external modules found</div>
	{:else if finished}
		<div class="text-center opacity-50">End of the list</div>
	{/if}

	{#if gotError}
		<div class="flex flex-col items-center">
			<div class="text-red-500">Error loading</div>
			<button class="common-button">
				<Fa icon={faRefresh} />
				Try again
			</button>
		</div>
	{/if}
	{#if isLoading}
		<div class="flex flex-col items-center">
			<Spinner />
		</div>
	{/if}

	<div bind:this={listEnd}></div>
</ListPageLayout>
