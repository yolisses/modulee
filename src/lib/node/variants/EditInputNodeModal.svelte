<script lang="ts">
	import type { InputNode } from '$lib/data/InputNode.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import { getModalRootContext } from '$lib/ui/modalRootContext';
	import Portal from 'svelte-portal';

	interface Props {
		inputNode: InputNode;
		closeModal: () => void;
	}

	const { closeModal, inputNode }: Props = $props();
	const modalRootContext = getModalRootContext();
</script>

<Portal target={modalRootContext.modalRoot}>
	<Modal {closeModal}>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Edit input node</p>
			<label>
				<div>Name</div>
				<input type="text" class="common-input" />
			</label>
			<label>
				<div>Min</div>
				<input type="number" class="common-input" />
			</label>
			<label>
				<div>Max</div>
				<input type="number" class="common-input" />
			</label>
			<label>
				<div>Default</div>
				<input type="number" class="common-input" />
			</label>
		</div>
	</Modal>
</Portal>
