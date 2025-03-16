<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';

	interface Props {
		children: Snippet;
	}

	let isModalActive = $state(false);
	const { children }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<button class="common-button self-stretch bg-red-500 p-10" onclick={handleClick} title="More">
	<Fa icon={faEllipsisH} />
</button>

{#if isModalActive}
	<Modal {closeModal}>
		<div class="flex flex-col rounded bg-zinc-800">
			{@render children()}
		</div>
	</Modal>
{/if}
