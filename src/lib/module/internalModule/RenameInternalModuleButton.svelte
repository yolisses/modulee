<script lang="ts">
	import type { InternalModule } from '$lib/module/internalModule/InternalModule';
	import { ModalState } from '$lib/project/ui/ModalState.svelte';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RenameInternalModuleModal from './RenameInternalModuleModal.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const modalState = new ModalState();
	const { internalModule }: Props = $props();
</script>

<button class="common-button" onclick={modalState.open}>
	<Fa fw icon={faEdit} />
	Rename
</button>

{#if modalState.isOpen}
	<RenameInternalModuleModal {internalModule} {modalState} />
{/if}
