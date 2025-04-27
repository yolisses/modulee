<script lang="ts">
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	let isLoading = $state(false);
	const { projectData }: Props = $props();

	async function onClick() {
		isLoading = true;
		try {
			const res = await fetch('/api/externalModules', {
				method: 'POST',
				body: JSON.stringify({ project: projectData }),
				headers: { 'content-type': 'application/json' },
			});
		} catch (e) {}
		isLoading = false;
	}
</script>

<button class="common-button" onclick={onClick}>
	{#if isLoading}
		<Spinner size={20} />
	{:else}
		<Fa fw icon={faPuzzlePiece} />
	{/if}
	Create external module
</button>
