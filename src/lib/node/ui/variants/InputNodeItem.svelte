<script lang="ts">
	import type { InputNode } from '$lib/node/InputNode';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import EditInputNodeModal from './EditInputNodeModal.svelte';

	interface Props {
		inputNode: InputNode;
	}

	const { inputNode }: Props = $props();

	let isModalActive = $state(false);

	function handleClick(e: Event) {
		e.stopPropagation();
		isModalActive = true;
	}

	function closeModal() {
		isModalActive = false;
	}
</script>

<BaseNodeItem node={inputNode}>
	{#snippet preInputsChildren()}
		<button
			title="Edit input node"
			onpointerdown={handleClick}
			class="hover-bg flex flex-row items-center"
		>
			<div
				style:padding-inline="0.25lh"
				class="flex-1 overflow-hidden text-start text-ellipsis whitespace-nowrap"
			>
				{inputNode.name}
			</div>
			<Fa icon={faEdit} style="padding-inline: 0.25lh;" />
		</button>
	{/snippet}
</BaseNodeItem>

{#if isModalActive}
	<EditInputNodeModal {inputNode} {closeModal} />
{/if}
