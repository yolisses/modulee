<script lang="ts">
	import { setExternalModulesDataContext } from '$lib/module/externalModule/externalModulesDataContext';
	import { setProjectDataContext } from '$lib/project/projectDataContext';
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();
	const { projectData, externalModulesData } = data;

	setProjectDataContext({ projectData });
	setExternalModulesDataContext({ externalModulesData });
</script>

<ProjectPage>
	{@render children?.()}
</ProjectPage>
