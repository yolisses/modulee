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
						maxlength="100"
						bind:this={textInput}
						class="common-input w-full"
					/>
				</label>
				<div>
					Type
					<div class="flex flex-row gap-2">
						<label class="common-button">
							<input type="radio" required name="moduleType" id="effect" value="effect" />
							Effect
						</label>
						<label class="common-button">
							<input
								type="radio"
								required
								name="moduleType"
								id="instrument"
								value="instrument"
								checked
							/>
							Instrument
						</label>
						<label class="common-button">
							<input type="radio" required name="moduleType" id="utility" value="utility" />
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
