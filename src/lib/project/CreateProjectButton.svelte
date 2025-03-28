<script lang="ts">
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import CreateProjectModal from './CreateProjectModal.svelte';

	let isModalActive = $state(false);

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button onclick={handleClick} class="primary-button">
	<Fa icon={faPlus} />
	Create project
</button>

{#if isModalActive}
	<CreateProjectModal {closeModal} />
{/if}
