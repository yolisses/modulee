<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { ModalState } from '$lib/project/ui/ModalState.svelte';
	import { userDataContextKey } from '$lib/user/userDataContext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DeleteExternalModuleModal from './DeleteExternalModuleModal.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const modalState = new ModalState();
	const userDataContext = getRequiredContext(userDataContextKey);
</script>

{#if userDataContext.userData.id === externalModuleData.userId}
	<button class="common-button center-content" onclick={modalState.open}>
		<Fa fw icon={faTrash} />
		Delete
	</button>
{/if}

{#if modalState.isOpen}
	<DeleteExternalModuleModal {externalModuleData} {modalState} />
{/if}
