<script lang="ts">
	import { UpdateInputNodeExtrasCommand } from '$lib/commands/node/UpdateInputNodeExtrasCommand';
	import { createId } from '$lib/data/createId';
	import type { InputNode } from '$lib/data/InputNode.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import Modal from '$lib/ui/Modal.svelte';
	import { getModalRootContext } from '$lib/ui/modalRootContext';
	import Portal from 'svelte-portal';

	interface Props {
		inputNode: InputNode;
		closeModal: () => void;
	}

	const editorContext = getEditorContext();
	const modalRootContext = getModalRootContext();
	const { closeModal, inputNode }: Props = $props();
	const projectDataContext = getProjectDataContext();

	function handleBlur(key: string, value: string | number) {
		const command = new UpdateInputNodeExtrasCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'UpdateInputNodeExtrasCommand',
			projectId: projectDataContext.projectData.id,
			details: { extras: { [key]: value }, nodeId: inputNode.id },
		});
		editorContext.editor.execute(command);
	}
</script>

<Portal target={modalRootContext.modalRoot}>
	<Modal {closeModal}>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Edit input node</p>
			<label>
				<div>Name</div>
				<input
					type="text"
					class="common-input"
					bind:value={inputNode.extras.name}
					onblur={(e) => {
						const { value } = e.currentTarget;
						handleBlur('name', value);
					}}
				/>
			</label>
			<label>
				<div>Min</div>
				<input
					type="number"
					class="common-input"
					bind:value={inputNode.extras.min}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						handleBlur('min', value);
					}}
				/>
			</label>
			<label>
				<div>Max</div>
				<input
					type="number"
					class="common-input"
					bind:value={inputNode.extras.max}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						handleBlur('max', value);
					}}
				/>
			</label>
			<label>
				<div>Default</div>
				<input
					type="number"
					class="common-input"
					bind:value={inputNode.extras.default}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						handleBlur('default', value);
					}}
				/>
			</label>
		</div>
	</Modal>
</Portal>
