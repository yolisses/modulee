<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { onMount } from 'svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import { debugExternalModulesData } from './debugExternalModulesData';

	let debugCounter = 0;
	const debugMaxCounter = 10;

	let listEnd: HTMLElement;

	let isLoading = $state(false);
	let isFinished = $state(false);
	let isIntersecting = $state(false);
	const externalModulesData = $state<ExternalModuleData[]>([]);

	async function load() {
		// Simulate a network request
		await new Promise((resolve) => setTimeout(resolve, 1000));
		externalModulesData.push(...debugExternalModulesData);
	}

	$effect(() => {
		if (isIntersecting && !isLoading && !isFinished) {
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

<!-- <div class="float top-0 bg-zinc-800">
	<div>isLoading: {isLoading}</div>
	<div>isFinished: {isFinished}</div>
	<div>isIntersecting: {isIntersecting}</div>
</div> -->
<ListPageLayout title="External modules">
	{#if !isLoading && externalModulesData.length === 0}
		<div class="text-center">No external modules found</div>
	{:else}
		{#each externalModulesData as externalModuleData}
			<ExternalModuleItem {externalModuleData} />
		{/each}
	{/if}
	{#if isLoading}
		<div class="flex flex-col items-center">
			<Spinner />
		</div>
	{/if}
	<div bind:this={listEnd}></div>
</ListPageLayout>
