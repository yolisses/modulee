<script lang="ts">
	import GroupTab from './GroupTab.svelte';
	import GroupsTab from './GroupsTab.svelte';
	import ProjectTab from './ProjectTab.svelte';
	import SidebarTabs from './SidebarTabs.svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	const selectedTabContext = getSelectedTabContext();
</script>

<div class="w-full max-w-xs border-l border-black">
	<SidebarTabs />
	{#if selectedTabContext.selectedTab === 'group'}
		<GroupTab />
	{:else if selectedTabContext.selectedTab === 'groups'}
		<GroupsTab />
	{:else if selectedTabContext.selectedTab === 'project'}
		<ProjectTab />
	{/if}
</div>
