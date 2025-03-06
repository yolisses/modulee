<script lang="ts">
	import { getProjectsRepository } from '$lib/project/getProjectsRepository';
	import Spinner from '$lib/ui/Spinner.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	const projectsRepository = getProjectsRepository();
</script>

{#await projectsRepository.initialize()}
	<Spinner />
{:then value}
	{@render children?.()}
{/await}
