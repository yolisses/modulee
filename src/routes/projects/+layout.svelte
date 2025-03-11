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

<!-- TODO check if it makes sense doing this initialization here -->
{#await projectsRepository.initialize()}
	<div class="flex h-screen flex-col items-center justify-center">
		<Spinner />
	</div>
{:then value}
	{@render children?.()}
{/await}
