<script lang="ts">
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from '../data/ProjectData';
	import { ModalState } from './ModalState.svelte';
	import RenameProjectModal from './RenameProjectModal.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const modalState = new ModalState();
	const { projectData }: Props = $props();
</script>

<button class="common-button" onclick={modalState.open}>
	<Fa fw icon={faEdit} />
	Rename
</button>

{#if modalState.isOpen}
	<RenameProjectModal {projectData} {modalState} />
{/if}
