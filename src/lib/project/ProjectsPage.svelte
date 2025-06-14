<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import GuestUserWarn from '$lib/user/GuestUserWarn.svelte';
	import { getUserDataContext } from '$lib/user/userDataContext';
	import CreateProjectButton from './create/CreateProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
	const userDataContext = getUserDataContext();
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
