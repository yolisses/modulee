<script lang="ts">
	import ModulesTab from '../module/ModulesPage.svelte';
	import ProjectTab from '../project/ProjectPage.svelte';
	import InternalModuleTab from './InternalModuleTab.svelte';
	import SidebarTabs from './SidebarTabs.svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	const selectedTabContext = getSelectedTabContext();
</script>

<div class="w-full max-w-xs border-l-2 border-black/50">
	<SidebarTabs />
	{#if selectedTabContext.selectedTab === 'internalModule'}
		<InternalModuleTab />
	{:else if selectedTabContext.selectedTab === 'modules'}
		<ModulesTab />
	{:else if selectedTabContext.selectedTab === 'project'}
		<ProjectTab />
	{/if}
</div>
