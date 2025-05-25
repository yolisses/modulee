<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';

	interface Props {
		closeModal: () => void;
		projectId: string;
	}

	let cancelButton: HTMLButtonElement;
	const { closeModal, projectId }: Props = $props();

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {closeModal}>
	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="projectId" value={projectId} />
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Delete project?</p>
			<p>This action is <b>irreversible</b>.</p>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" bind:this={cancelButton} class="common-button" onclick={closeModal}>
					Cancel
				</button>
				<button type="submit" class="rounded bg-red-500 p-2 hover:bg-red-600"> Delete </button>
			</div>
		</div>
	</form>
</Modal>
