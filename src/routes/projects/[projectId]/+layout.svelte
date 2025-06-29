<script lang="ts">
	import ProjectLayout from '$lib/project/ui/ProjectLayout.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();
	const { projectData, externalModulesData } = data;
</script>

<ProjectLayout {projectData} {externalModulesData}>
	{@render children?.()}
</ProjectLayout>
