<script lang="ts">
	import InternalModuleTab from './InternalModuleTab.svelte';
	import ModulesTab from './ModulesTab.svelte';
	import ProjectTab from './ProjectTab.svelte';
	import SidebarTabs from './SidebarTabs.svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	const selectedTabContext = getSelectedTabContext();
</script>

<div class="w-full max-w-xs border-l border-black">
	<SidebarTabs />
	{#if selectedTabContext.selectedTab === 'internalModule'}
		<InternalModuleTab />
	{:else if selectedTabContext.selectedTab === 'modules'}
		<ModulesTab />
	{:else if selectedTabContext.selectedTab === 'project'}
		<ProjectTab />
	{/if}
</div>
