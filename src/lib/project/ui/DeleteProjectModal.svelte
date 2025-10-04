<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ModalState } from '../../ui/ModalState.svelte';
	import type { ProjectData } from '../data/ProjectData';

	interface Props {
		modalState: ModalState;
		projectData: ProjectData;
	}

	let cancelButton: HTMLButtonElement;
	const { modalState, projectData }: Props = $props();

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {modalState}>
	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="projectId" value={projectData.id} />
		<div class="modal-container">
			<p>Delete the project <b>{projectData.name}</b>?</p>
			<p>This action is <b>irreversible</b>.</p>
			<div class="flex flex-row justify-end gap-2">
				<button
					bind:this={cancelButton}
					class="common-button"
					onclick={modalState.close}
					type="button"
				>
					Cancel
				</button>
				<button type="submit" class="rounded bg-red-500 p-2 hover:bg-red-600"> Delete </button>
			</div>
		</div>
	</form>
</Modal>
