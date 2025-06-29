<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DeleteProjectModal from './DeleteProjectModal.svelte';
	import type { ProjectData } from './ProjectData';

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

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faTrash} />
	Delete
</button>

{#if isModalActive}
	<DeleteProjectModal {projectData} {closeModal} />
{/if}
