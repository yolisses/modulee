<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import GuestUserWarn from '$lib/user/GuestUserWarn.svelte';
	import { userDataContextKey } from '$lib/user/userDataContext';
	import CreateProjectButton from '../create/CreateProjectButton.svelte';
	import type { ProjectData } from '../data/ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
	const userDataContext = getRequiredContext(userDataContextKey);
</script>

<ListPageLayout title="Projects">
	{#snippet topChildren()}
		<CreateProjectButton />
	{/snippet}
	{#snippet children()}
		{#if userDataContext.userData.isGuest}
			<GuestUserWarn />
		{/if}
		<ProjectList {projectsData} />
	{/snippet}
</ListPageLayout>
