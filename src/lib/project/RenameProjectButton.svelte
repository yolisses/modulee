<script lang="ts">
	import type { ProjectData } from './ProjectData';
	import RenameProjectModal from './RenameProjectModal.svelte';

	interface Props {
		projectData: ProjectData;
	}

	let isModalActive = $state(false);
	const { projectData }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}> Rename </button>

{#if isModalActive}
	<RenameProjectModal {projectData} {closeModal} />
{/if}
