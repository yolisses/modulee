<script lang="ts">
	import ActionCommandsPalette from '$lib/editor/ActionCommandsPalette.svelte';
	import { getIsCommandPaletteActiveContext } from '$lib/editor/isCommandPaletteActiveContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import { setExternalModulesDataContext } from '$lib/module/externalModule/externalModulesDataContext';
	import { getIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { type Snippet } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { setProjectDataContext } from './projectDataContext';
	import { setMenuVisibilityContexts } from './setMenuVisibilityContexts.svelte';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
		externalModulesData: ExternalModuleData[];
	}

	const { children, projectData, externalModulesData }: Props = $props();

	setMenuVisibilityContexts();
	setProjectDataContext({ projectData });
	setExternalModulesDataContext({ externalModulesData });

	const isSidebarVisibleContext = getIsSidebarVisibleContext();
	const isCommandPaletteActiveContext = getIsCommandPaletteActiveContext();
</script>

<div class="flex h-screen w-screen flex-row overflow-hidden">
	<div class="flex-1">
		{@render children?.()}
	</div>
	{#if isSidebarVisibleContext.isSidebarVisible}
		<Sidebar />
	{/if}
</div>

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
