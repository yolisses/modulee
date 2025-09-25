<script lang="ts">
	import { getColorFromId } from '$lib/connection/getColorFromId';
	import type { InputNode } from '$lib/node/InputNode';
	import { ModalState } from '$lib/ui/ModalState.svelte';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import EditInputNodeModal from './EditInputNodeModal.svelte';
	import InputNodeValueSlider from './InputNodeValueSlider.svelte';

	interface Props {
		inputNode: InputNode;
	}

	const { inputNode }: Props = $props();
	const modalState = new ModalState();

	function handleClick(e: Event) {
		e.stopPropagation();
		modalState.open();
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
		<InputNodeValueSlider {inputNode} color={getColorFromId(inputNode.id)} />
	{/snippet}
</BaseNodeItem>

{#if modalState.isOpen}
	<EditInputNodeModal {inputNode} {modalState} />
{/if}
