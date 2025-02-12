<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicLinkList from '$lib/ui/BasicLinkList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import { getSelectedTabContext } from './selectedTabContext';

	const editorContext = getEditorContext();
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
		values={editorContext.editor.groups.values()}
	/>
</div>
