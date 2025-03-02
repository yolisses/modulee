<script lang="ts">
	import SimpleItem from '$lib/ui/SimpleItem.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
</script>

<SimpleItem item={projectData} route="/projects/[id]">
	{#snippet buttons({ id, item })}
		<RenameProjectButton projectData={item} />
		<DeleteProjectButton projectId={id} />
	{/snippet}
</SimpleItem>
