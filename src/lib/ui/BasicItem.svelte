<script lang="ts" generics="T">
	interface Props {
		value: T;
		text: string;
		onClick: (value: T) => void;
		onDelete?: (value: T) => void;
	}

	const { text, value, onClick, onDelete }: Props = $props();

	function handleClick() {
		onClick(value);
	}

	function handleDeleteClick() {
		onDelete?.(value);
	}
</script>

<div class="hover-bg flex flex-row">
	<button onclick={handleClick} class="flex-1 p-2">
		{text}
	</button>
	{#if onDelete}
		<button onclick={handleDeleteClick} class="common-button"> Delete </button>
	{/if}
</div>
