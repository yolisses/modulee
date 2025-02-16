<script lang="ts" generics="T">
	interface Props {
		value: T;
		text: string;
		href: string;
		onClick: (value: T) => void;
		onDelete?: (value: T) => void;
	}

	const { text, value, href, onClick, onDelete }: Props = $props();

	function handleClick() {
		onClick(value);
	}

	function handleDeleteClick() {
		onDelete?.(value);
	}
</script>

<div class="common-button flex flex-row">
	<a {href} onclick={handleClick} class="flex-1">
		{text}
	</a>
	{#if onDelete}
		<button onclick={handleDeleteClick}> Delete </button>
	{/if}
</div>
