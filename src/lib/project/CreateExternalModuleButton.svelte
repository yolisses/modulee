<script lang="ts">
	import { goto } from '$app/navigation';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { faUpload } from '@fortawesome/free-solid-svg-icons';
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
			const data = await res.json();
			goto(`/projects/${projectData.id}/externalModules/${data.id}`);
		} catch (e) {}
		isLoading = false;
	}
</script>

<button class="common-button" onclick={onClick}>
	{#if isLoading}
		<Spinner size={20} />
	{:else}
		<Fa fw icon={faUpload} />
	{/if}
	Publish as external module
</button>
