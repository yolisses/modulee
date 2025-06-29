<script lang="ts">
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from '../data/ProjectData';
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

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faEdit} />
	Rename
</button>

{#if isModalActive}
	<RenameProjectModal {projectData} {closeModal} />
{/if}
