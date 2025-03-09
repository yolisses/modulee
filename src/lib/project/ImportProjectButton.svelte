<script lang="ts">
	import { faFileImport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ImportProjectModal from './ImportProjectModal.svelte';

	let isModalActive = $state(false);

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileImport} />
	Import project
</button>

{#if isModalActive}
	<ImportProjectModal {closeModal} />
{/if}
