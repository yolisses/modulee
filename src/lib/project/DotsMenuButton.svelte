<script lang="ts">
	import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import Menu from './Menu.svelte';

	interface Props {
		children: Snippet;
	}

	let isModalActive = $state(false);
	let button = $state<HTMLElement>();
	const { children }: Props = $props();

	function handleClick() {
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<!-- This px-2.5 is a hacky solution to use in home pages -->
<button
	title="More"
	bind:this={button}
	onclick={handleClick}
	class="common-button self-stretch px-2.5"
>
	<Fa fw icon={faEllipsisV} />
</button>

{#if isModalActive}
	<Menu {closeModal} referenceElement={button}>
		{@render children()}
	</Menu>
{/if}
