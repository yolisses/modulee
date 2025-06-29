<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ProjectData } from '../data/ProjectData';

	interface Props {
		closeModal: () => void;
		projectData: ProjectData;
	}

	const { closeModal, projectData }: Props = $props();
	let textInput: HTMLInputElement;

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {closeModal}>
	<form
		method="post"
		class="contents"
		use:enhance={closeModal}
		action="/projects/{projectData.id}?/patch"
	>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Rename project "{projectData?.name}"</p>
			<input
				type="text"
				name="name"
				class="common-input"
				bind:this={textInput}
				value={projectData.name}
			/>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={closeModal}> Cancel </button>
				<button type="submit" class="primary-button"> Rename </button>
			</div>
		</div>
	</form>
</Modal>
