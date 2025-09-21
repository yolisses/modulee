<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import GroupNodesButton from '$lib/module/internalModule/GroupNodesButton.svelte';
	import { projectToolbarContextKey } from '$lib/project/ui/projectToobalContext';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import { portal } from 'svelte-portal';
	import OrganizeNodesButton from './organize/OrganizeNodesButton.svelte';

	const projectToobalContext = getRequiredContext(projectToolbarContextKey);
</script>

<div use:portal={projectToobalContext.projectToolbar} class="contents">
	<ZoomInButton />
	<ZoomOutButton />
	<GroupNodesButton />
	<OrganizeNodesButton />
</div>
