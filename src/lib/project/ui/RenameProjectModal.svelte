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

	const { modalState, projectData }: Props = $props();
	let textInput: HTMLInputElement;

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {modalState}>
	<form
		action="/projects/{projectData.id}?/patch"
		class="contents"
		method="post"
		use:enhance={modalState.close}
	>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Rename project "{projectData?.name}"</p>
			<input
				bind:this={textInput}
				class="common-input"
				name="name"
				type="text"
				value={projectData.name}
			/>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={modalState.close}> Cancel </button>
				<button type="submit" class="primary-button"> Rename </button>
			</div>
		</div>
	</form>
</Modal>
