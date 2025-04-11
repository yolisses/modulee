<script lang="ts">
	import { createId } from '$lib/data/createId';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { onMount } from 'svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleList from './ExternalModuleList.svelte';

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

		externalModulesData.push({
			id: createId(),
			name: 'Debug module' + debugCounter,
			userId: '67f8128ac4214545e204df94',
			usageCount: Math.floor(1000 * Math.random()),
			likeCount: Math.floor(1000 * Math.random()),
			user: { username: 'debug_user' },
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi enim voluptatibus adipisci reiciendis fuga earum veniam omnis, magnam nobis possimus, voluptatem vero, dolorum aliquam esse est laboriosam doloribus officia!',
		});
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
		<ExternalModuleList {externalModulesData} />
	{/if}
	{#if isLoading}
		<div class="flex flex-col items-center">
			<Spinner />
		</div>
	{/if}
	<div bind:this={listEnd}></div>
</ListPageLayout>
