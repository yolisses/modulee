<script lang="ts">
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

<button class="common-button" onclick={handleClick}> Delete </button>

{#if isModalActive}
	<DeleteProjectModal {projectId} {closeModal} />
{/if}
