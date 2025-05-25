<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';

	interface Props {
		closeModal: () => void;
	}

	let textInput: HTMLInputElement;
	const { closeModal }: Props = $props();

	onMount(() => {
		textInput.focus();
		textInput.select();
	});
</script>

<Modal {closeModal}>
	<form action="?/create" method="post" use:enhance>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Create project</p>
			<label>
				<div>Name</div>
				<input required name="name" type="text" class="common-input" bind:this={textInput} />
			</label>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={closeModal}> Cancel </button>
				<button type="submit" class="primary-button"> Create </button>
			</div>
		</div>
	</form>
</Modal>
