<script lang="ts">
	import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ImportGroupModal from './ImportGroupModal.svelte';

	let isModalActive = $state(false);

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faArrowCircleDown} />
	Import group
</button>

{#if isModalActive}
	<ImportGroupModal {closeModal} />
{/if}
