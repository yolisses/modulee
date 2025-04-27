<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DeleteProjectModal from './DeleteProjectModal.svelte';

	interface Props {
		projectId: string;
	}

	let isModalActive = $state(false);
	const { projectId }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faTrash} />
	Delete project
</button>

{#if isModalActive}
	<DeleteProjectModal {projectId} {closeModal} />
{/if}
