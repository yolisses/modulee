<script lang="ts">
	import { UpdateInputNodeExtrasCommand } from '$lib/commands/node/UpdateInputNodeExtrasCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { InputNode } from '$lib/node/InputNode';
	import type { ModalState } from '$lib/project/ui/ModalState.svelte';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import Modal from '$lib/ui/Modal.svelte';
	import { modalRootContextKey } from '$lib/ui/modalRootContext';
	import Portal from 'svelte-portal';

	interface Props {
		inputNode: InputNode;
		modalState: ModalState;
	}

	const editorContext = getRequiredContext(editorContextKey);
	const modalRootContext = getRequiredContext(modalRootContextKey);
	const { modalState, inputNode }: Props = $props();
	const projectDataContext = getRequiredContext(projectDataContextKey);

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
	<Modal {modalState}>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Edit input node</p>
			<label>
				<div>Name</div>
				<input
					required
					type="text"
					class="common-input"
					value={inputNode.extras.name}
					onblur={(e) => {
						let { value } = e.currentTarget;
						value = value.trim();
						if (value.length === 0) return;
						handleBlur('name', value);
					}}
				/>
			</label>
			<label>
				<div>Min</div>
				<input
					required
					type="number"
					class="common-input"
					value={inputNode.extras.min}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						if (Number.isNaN(value)) return;
						handleBlur('min', value);
					}}
				/>
			</label>
			<label>
				<div>Max</div>
				<input
					required
					type="number"
					class="common-input"
					value={inputNode.extras.max}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						if (Number.isNaN(value)) return;
						handleBlur('max', value);
					}}
				/>
			</label>
			<label>
				<div>Default</div>
				<input
					required
					type="number"
					class="common-input"
					value={inputNode.extras.default}
					onblur={(e) => {
						const value = Number.parseFloat(e.currentTarget.value);
						if (Number.isNaN(value)) return;
						handleBlur('default', value);
					}}
				/>
			</label>
		</div>
	</Modal>
</Portal>
