<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import { NotImplementedError } from '$lib/NotImplementedError';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ProjectData } from './ProjectData';

	interface Props {
		closeModal: () => void;
	}

	let isLoading = $state(false);
	let textInput: HTMLInputElement;
	let name = $state('New project');
	const { closeModal }: Props = $props();

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;
		const mainInternalModuleId = createId();
		const projectData: ProjectData = {
			name,
			id: createId(),
			moduleType: 'utility',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			graph: {
				nodes: [],
				connections: [],
				mainInternalModuleId,
				externalModuleReferences: [],
				internalModules: [{ id: mainInternalModuleId, name: 'Main internal module' }],
			},
		};

		throw new NotImplementedError();

		goto(
			'/projects/' +
				projectData.id +
				'/internalModules/' +
				projectData.graph.mainInternalModuleId +
				'/graph',
		);
	}

	onMount(() => {
		textInput.focus();
		textInput.select();
	});
</script>

<Modal {closeModal}>
	<form onsubmit={handleSubmit}>
		<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
			<p>Create project</p>
			<label>
				<div>Name</div>
				<input required type="text" bind:value={name} class="common-input" bind:this={textInput} />
			</label>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={closeModal} disabled={isLoading}>
					Cancel
				</button>
				<button type="submit" class="primary-button" disabled={isLoading}> Create </button>
			</div>
		</div>
	</form>
</Modal>
