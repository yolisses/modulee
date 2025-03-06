<script lang="ts">
	import ImportGroupModal from './ImportGroupModal.svelte';

	let isModalActive = $state(false);

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}> Import project </button>

{#if isModalActive}
	<ImportGroupModal {closeModal} />
{/if}
