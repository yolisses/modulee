<script lang="ts">
	import { ModalState } from '$lib/project/ui/ModalState.svelte';
	import type { Placement } from '@floating-ui/dom';
	import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';
	import Menu from './Menu.svelte';

	interface Props {
		children: Snippet;
		placement?: Placement;
	}

	const { children, placement }: Props = $props();
	const modalState = new ModalState();
	let button = $state<HTMLElement>();
</script>

<!-- This px-2.5 is a hacky solution to use in home pages -->
<button
	title="Options"
	bind:this={button}
	onclick={modalState.open}
	class="common-button self-stretch px-2.5"
>
	<Fa fw icon={faEllipsisV} />
</button>

{#if modalState.isOpen}
	<Menu {modalState} referenceElement={button} {placement}>
		{@render children()}
	</Menu>
{/if}
