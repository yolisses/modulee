<script lang="ts">
	import { AddExternalModuleReferenceCommand } from '$lib/commands/externalModule/AddExternalModuleReferenceCommand';
	import { createId } from '$lib/data/createId';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getModulesRepository } from '$lib/module/getModulesRepository';
	import type { ModuleData } from '$lib/module/ModuleData';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import Modal from '$lib/ui/Modal.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { getVersionString } from './getVersionString';

	const editorContext = getEditorContext();
	const modulesRepository = getModulesRepository();
	const projectDataContext = getProjectDataContext();

	let modulesDataPromise = $state(modulesRepository.getModules());

	interface Props {
		closeModal: () => void;
	}

	const { closeModal }: Props = $props();

	function handleModuleSelect(moduleData: ModuleData) {
		const command = new AddExternalModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'AddExternalModuleReferenceCommand',
			projectId: projectDataContext.projectData.id,
			details: {
				externalModuleReference: {
					type: 'external',
					id: moduleData.id,
					version: moduleData.version,
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
					{#await modulesDataPromise}
						<div class="flex h-full flex-1 flex-col items-center p-8">
							<Spinner />
						</div>
					{:then modulesData}
						<BasicList {getId} values={modulesData} {getName} onClick={handleModuleSelect}>
							{#snippet buttons(moduleData)}
								<div class="p-2">
									{getVersionString(moduleData.version)}
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
