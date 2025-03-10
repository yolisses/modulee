<script lang="ts">
	import InternalModuleTab from './InternalModuleTab.svelte';
	import InternalModulesTab from './InternalModulesTab.svelte';
	import ProjectTab from './ProjectTab.svelte';
	import SidebarTabs from './SidebarTabs.svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	const selectedTabContext = getSelectedTabContext();
</script>

<div class="w-full max-w-xs border-l border-black">
	<SidebarTabs />
	{#if selectedTabContext.selectedTab === 'internalModule'}
		<InternalModuleTab />
	{:else if selectedTabContext.selectedTab === 'internalModules'}
		<InternalModulesTab />
	{:else if selectedTabContext.selectedTab === 'project'}
		<ProjectTab />
	{/if}
</div>
