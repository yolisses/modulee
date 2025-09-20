<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { ModalState } from '../../ui/ModalState.svelte';
	import type { ProjectData } from '../data/ProjectData';
	import DeleteProjectModal from './DeleteProjectModal.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
	const modalState = new ModalState();
</script>

<button class="common-button" onclick={modalState.open}>
	<Fa fw icon={faTrash} />
	Delete
</button>

{#if modalState.isOpen}
	<DeleteProjectModal {projectData} {modalState} />
{/if}
