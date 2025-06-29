<script lang="ts">
	import type { InternalModule } from '$lib/module/internalModule/InternalModule.svelte';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RenameInternalModuleModal from './RenameInternalModuleModal.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	let isModalActive = $state(false);
	const { internalModule }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faEdit} />
	Rename
</button>

{#if isModalActive}
	<RenameInternalModuleModal {internalModule} {closeModal} />
{/if}
