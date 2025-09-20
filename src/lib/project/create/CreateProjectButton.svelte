<script lang="ts">
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { ModalState } from '../../ui/ModalState.svelte';
	import CreateProjectModal from './CreateProjectModal.svelte';

	const modalState = new ModalState();
</script>

<button onclick={modalState.open} class="primary-button">
	<Fa fw icon={faPlus} />
	Create project
</button>

{#if modalState.isOpen}
	<CreateProjectModal {modalState} />
{/if}
