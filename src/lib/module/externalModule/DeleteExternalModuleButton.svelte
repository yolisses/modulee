<script lang="ts">
	import { ModalState } from '$lib/project/ui/ModalState.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DeleteExternalModuleModal from './DeleteExternalModuleModal.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const modalState = new ModalState();
</script>

<button class="common-button center-content" onclick={modalState.open}>
	<Fa fw icon={faTrash} />
	Delete
</button>

{#if modalState.isOpen}
	<DeleteExternalModuleModal {externalModuleData} {modalState} />
{/if}
