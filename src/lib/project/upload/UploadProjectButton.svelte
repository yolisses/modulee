<script lang="ts">
	import { faUpload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UploadProjectModal from './UploadProjectModal.svelte';

	let isModalActive = $state(false);

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faUpload} />
	Upload project
</button>

{#if isModalActive}
	<UploadProjectModal {closeModal} />
{/if}
