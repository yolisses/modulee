<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import type { ModalState } from '$lib/ui/ModalState.svelte';
	import { onMount } from 'svelte';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		modalState: ModalState;
		externalModuleData: ExternalModuleData;
	}

	let cancelButton: HTMLButtonElement;
	const { modalState, externalModuleData }: Props = $props();

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {modalState}>
	<form action="/externalModules?/delete" method="post" use:enhance>
		<input type="hidden" name="externalModuleId" value={externalModuleData.id} />
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Delete the external module <b>{externalModuleData.name}</b>?</p>
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
