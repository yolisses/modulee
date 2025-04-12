<script lang="ts">
	import { enhance } from '$app/forms';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faEraser, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';

	let debugCounter = 0;
	const debugMaxCounter = 10;

	let listEnd: HTMLElement;

	let isLoading = $state(false);
	let isFinished = $state(false);
	let isIntersecting = $state(false);
	let gotError = $state(false);
	const externalModulesData = $state<ExternalModuleData[]>([]);

	async function load() {
		const res = await fetch('/api/externalModules', { method: 'GET' });

		if (!res.ok) {
			gotError = true;
			return;
		}

		const data = await res.json();
		console.log(data);
		externalModulesData.push(...data);
	}

	$effect(() => {
		if (isIntersecting && !gotError && !isLoading && !isFinished) {
			isLoading = true;
			if (debugCounter > debugMaxCounter) {
				isLoading = false;
				isFinished = true;
				return;
			}

			debugCounter++;
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
</script>

<ListPageLayout title="External modules">
	<form action="" method="get" class="flex flex-col gap-2" use:enhance>
		<div class="flex flex-row items-end gap-2">
			<label class="flex flex-1 flex-col">
				Text
				<input type="text" class="common-input" name="text" />
			</label>
			<label class="flex flex-col">
				Sort by
				<select class="common-input" name="sort">
					<option class="bg-zinc-800"></option>
					<option class="bg-zinc-800" value="likes">Likes</option>
					<option class="bg-zinc-800" value="createdAtDesc">Creation date</option>
					<option class="bg-zinc-800" value="downloads_all_time">Downloads in all time</option>
					<option class="bg-zinc-800" value="downloads_this_month">Downloads in 30 days</option>
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

	{#if !isLoading && externalModulesData.length === 0}
		<div class="text-center">No external modules found</div>
	{:else}
		<div>
			{#each externalModulesData as externalModuleData}
				<ExternalModuleItem {externalModuleData} />
			{/each}
		</div>
	{/if}
	{#if gotError}
		<div>
			<div>Error loading</div>
			<button>
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
