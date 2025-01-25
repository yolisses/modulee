<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';

	interface Props {
		closeModal: () => void;
		projectId: string;
	}

	const { closeModal, projectId }: Props = $props();
</script>

<Modal {closeModal}>
	<div class="gap-2 rounded bg-zinc-800 p-2">
		<p>Delete project?</p>
		<p>This action is irreversible.</p>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={closeModal}>Cancel</button>
			<button class="rounded bg-red-500 p-2 hover:bg-red-600">Delete</button>
		</div>
	</div>
</Modal>
