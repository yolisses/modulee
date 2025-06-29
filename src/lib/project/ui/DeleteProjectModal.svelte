<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ProjectData } from '../data/ProjectData';

	interface Props {
		closeModal: () => void;
		projectData: ProjectData;
	}

	let cancelButton: HTMLButtonElement;
	const { closeModal, projectData }: Props = $props();

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {closeModal}>
	<form action="?/delete" method="post" use:enhance>
		<input type="hidden" name="projectId" value={projectData.id} />
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Delete the project <b>{projectData.name}</b>?</p>
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
