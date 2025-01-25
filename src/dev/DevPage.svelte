<script>
	import Modal from '$lib/ui/Modal.svelte';

	let isModalActive = $state(true);

	function closeModal() {
		isModalActive = false;
	}
</script>

{#if isModalActive}
	<Modal {closeModal}>hello</Modal>
{/if}
