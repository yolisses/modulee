<script lang="ts">
	import { setProjectDataContext } from '$lib/project/projectDataContext';
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();
	const { projectData } = data;

	setProjectDataContext({ projectData });
</script>

<ProjectPage>
	{@render children?.()}
</ProjectPage>
