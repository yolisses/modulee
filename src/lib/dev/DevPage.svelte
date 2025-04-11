<script lang="ts">
	import { createId } from '$lib/data/createId';
	import { onMount } from 'svelte';

	type Item = {
		id: string;
	};

	let listEnd: HTMLElement;
	let isLoading = $state(false);
	let isFinished = $state(false);
	const items = $state<Item[]>([]);
	let isIntersecting = $state(false);

	async function load() {
		// Simulate a network request
		await new Promise((resolve) => setTimeout(resolve, 100));

		items.push({
			id: createId(),
		});
	}

	let counter = 0;

	$effect(() => {
		if (isIntersecting && !isLoading && !isFinished) {
			isLoading = true;
			if (counter > 5) {
				isLoading = false;
				isFinished = true;
				return;
			}

			counter++;
			load().then(() => {
				isLoading = false;
			});
		}
	});

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			isIntersecting = false;
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isIntersecting = true;
				}
			});
		}, {});
		observer.observe(listEnd);
	});
</script>

<div class="sticky top-0 bg-zinc-800">
	<div>isLoading: {isLoading}</div>
	<div>isFinished: {isFinished}</div>
	<div>isIntersecting: {isIntersecting}</div>
</div>

<div>
	{#each items as item (item.id)}
		<div>
			{item.id}
		</div>
	{/each}
	<div class="bg-red-500 p-2" bind:this={listEnd}></div>
</div>
