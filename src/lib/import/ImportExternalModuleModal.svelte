<script lang="ts">
	import { AddExternalModuleReferenceCommand } from '$lib/commands/externalModule/AddExternalModuleReferenceCommand';
	import { createId } from '$lib/data/createId';
	import { getEditorContext } from '$lib/editor/editorContext';
	import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
	import { getExternalModulesRepository } from '$lib/module/getExternalModulesRepository';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import Modal from '$lib/ui/Modal.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { getVersionString } from './getVersionString';

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	const externalModulesRepository = getExternalModulesRepository();

	let externalModulesDataPromise = $state(externalModulesRepository.getExternalModules());

	interface Props {
		closeModal: () => void;
	}

	const { closeModal }: Props = $props();

	function handleModuleSelect(externalModuleData: ExternalModuleData) {
		const command = new AddExternalModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'AddExternalModuleReferenceCommand',
			projectId: projectDataContext.projectData.id,
			details: {
				externalModuleReference: {
					type: 'external',
					id: externalModuleData.id,
					version: externalModuleData.version,
				},
			},
		});
		editorContext.editor.execute(command);
		closeModal();
	}
</script>

<Modal {closeModal}>
	<div
		class="flex min-h-[50vh] w-full max-w-md flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black"
	>
		<div class="flex flex-col items-center">
			<div class="flex w-full max-w-xl flex-col gap-4">
				<div class="flex flex-row items-center justify-between gap-2">
					<h1 class="pl-2 text-xl font-medium">Import external module</h1>
				</div>
				<div>
					{#await externalModulesDataPromise}
						<div class="flex h-full flex-1 flex-col items-center p-8">
							<Spinner />
						</div>
					{:then externalModulesData}
						<BasicList {getId} values={externalModulesData} {getName} onClick={handleModuleSelect}>
							{#snippet buttons(externalModuleData)}
								<div class="p-2">
									{getVersionString(externalModuleData.version)}
								</div>
							{/snippet}
						</BasicList>
					{:catch error}
						<div class="text-red-500">
							<div>It was not possible to load the modules</div>
							<div>{error}</div>
						</div>
					{/await}
				</div>
			</div>
		</div>
	</div>
</Modal>
