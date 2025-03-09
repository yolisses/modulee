<script lang="ts">
	import { getModulesRepository } from '$lib/module/getModulesRepository';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import Modal from '$lib/ui/Modal.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';

	const modulesRepository = getModulesRepository();

	let modulesDataPromise = $state(modulesRepository.getModules());

	interface Props {
		closeModal: () => void;
	}

	const { closeModal }: Props = $props();

	function handleModuleSelect() {
		// TODO
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
					<h1 class="pl-2 text-xl font-medium">Import group</h1>
				</div>
				<div>
					{#await modulesDataPromise}
						<div class="flex h-full flex-1 flex-col items-center p-8">
							<Spinner></Spinner>
						</div>
					{:then modulesData}
						<BasicList {getId} values={modulesData} {getName} onClick={handleModuleSelect} />
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
