<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Group } from '$lib/data/Group.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicLinkList from '$lib/ui/BasicLinkList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import { getSelectedTabContext } from './selectedTabContext';

	const graphContext = getGraphContext();
	const selectedTabContext = getSelectedTabContext();
	const projectDataContext = getProjectDataContext();

	function handleClick(group: Group) {
		selectedTabContext.selectedTab = 'group';
	}

	function getLink(group: Group) {
		return `/projects/${projectDataContext.projectData.id}/${group.id}`;
	}
</script>

<div class="flex flex-col">
	<BasicLinkList
		{getId}
		{getLink}
		{getName}
		onClick={handleClick}
		values={graphContext.graph.groups.values()}
	/>
</div>
