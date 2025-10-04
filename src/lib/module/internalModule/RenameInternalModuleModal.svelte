<script lang="ts">
	import { RenameInternalModuleCommand } from '$lib/commands/internalModule/RenameInternalModuleCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import Modal from '$lib/ui/Modal.svelte';
	import type { ModalState } from '$lib/ui/ModalState.svelte';
	import { onMount } from 'svelte';
	import type { InternalModule } from './InternalModule';

	interface Props {
		modalState: ModalState;
		internalModule: InternalModule;
	}

	const { modalState, internalModule }: Props = $props();

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
		modalState.close();
	}

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {modalState}>
	<div class="modal-container">
		<p>Rename internalModule "{internalModule?.name}"</p>
		<input
			type="text"
			bind:value={name}
			class="common-input"
			bind:this={textInput}
			onchange={handleSubmit}
		/>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={modalState.close}> Cancel </button>
			<button class="primary-button" onclick={handleSubmit}> Rename </button>
		</div>
	</div>
</Modal>
