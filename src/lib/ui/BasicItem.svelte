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

<div class="common-button">
	<button onclick={handleClick}>
		{text}
	</button>
	{#if onDelete}
		<button onclick={handleDeleteClick}> Delete </button>
	{/if}
</div>
