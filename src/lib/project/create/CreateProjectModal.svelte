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
		<div class="flex flex-col gap-4 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Create project</p>
			<div class="flex flex-col gap-2">
				<label>
					<div>Name</div>
					<input
						required
						name="name"
						type="text"
						class="common-input w-full"
						bind:this={textInput}
					/>
				</label>
				<div>
					Type
					<div class="flex flex-row gap-2">
						<label class="common-button">
							<input id="effect" type="radio" required value="effect" name="moduleType" />
							Effect
						</label>
						<label class="common-button">
							<input type="radio" id="instrument" required name="moduleType" value="instrument" />
							Instrument
						</label>
						<label class="common-button">
							<input type="radio" id="utility" required value="utility" name="moduleType" />
							Utility
						</label>
					</div>
				</div>
			</div>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={closeModal}> Cancel </button>
				<button type="submit" class="primary-button"> Create </button>
			</div>
		</div>
	</form>
</Modal>
