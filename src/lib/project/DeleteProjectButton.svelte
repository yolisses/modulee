<script lang="ts">
	import DeleteProjectModal from './DeleteProjectModal.svelte';

	interface Props {
		projectId: string;
	}

	const { projectId }: Props = $props();
	let isModalActive = $state(false);

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
