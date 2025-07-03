<script lang="ts">
	import { RenameInternalModuleCommand } from '$lib/commands/internalModule/RenameInternalModuleCommand';
	import { createId } from '$lib/global/createId';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { InternalModule } from './InternalModule';

	interface Props {
		closeModal: () => void;
		internalModule: InternalModule;
	}

	const { closeModal, internalModule }: Props = $props();

	let textInput: HTMLInputElement;
	let name = $state(internalModule.name);
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleSubmit() {
		const command = new RenameInternalModuleCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RenameInternalModuleCommand',
			projectId: projectDataContext.projectData.id,
			details: { name, internalModuleId: internalModule.id },
		});
		editorContext.editor.execute(command);
		closeModal();
	}

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
		<p>Rename internalModule "{internalModule?.name}"</p>
		<input
			type="text"
			bind:value={name}
			class="common-input"
			bind:this={textInput}
			onchange={handleSubmit}
		/>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={closeModal}> Cancel </button>
			<button class="primary-button" onclick={handleSubmit}> Rename </button>
		</div>
	</div>
</Modal>
