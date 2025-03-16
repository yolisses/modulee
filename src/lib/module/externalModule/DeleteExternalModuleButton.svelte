<script lang="ts">
	import DeleteExternalModuleModal from './DeleteExternalModuleModal.svelte';

	interface Props {
		externalModuleId: string;
	}

	let isModalActive = $state(false);
	const { externalModuleId }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}> Delete </button>

{#if isModalActive}
	<DeleteExternalModuleModal {externalModuleId} {closeModal} />
{/if}
